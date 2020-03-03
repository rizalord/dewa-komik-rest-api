import React, { Component } from 'react';
import Constant from './../systems/constants';
import MUIDataTable from "mui-datatables";
import SweetAlert  from 'sweetalert2-react';
import swal from 'sweetalert2';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// var Carousel = require('react-responsive-carousel').Carousel;
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';




export default class CarouselScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            addModal : 'none',
            editModal : 'none',
            imgSrc: '',
            selectGenre : 'default',
            dataCarousel : [],
            idEditTarget : null,
            value : 0,
            selectManga: 'default',
            mangaList: [],
            targetMangaName : null,
            targetMangaId : null,

            // form error
            imgSrcErr : false,
            selectGenreErr : false,
            selectMangaValidate: false,
        }

        this.method ={
            addCarousel : this._addCarousel.bind(this),
            editCarousel: this._editCarousel.bind(this),
            validateAdd : this._validateAdd.bind(this)
        }

        

        this._getCarousel = this._getCarousel.bind(this);

    }
    _editCarousel(){
        if (this.method.validateAdd()) {
            // tambah ke database
            this._editToDatabase();
        }
    }

    _editBtnHandler(id){
        fetch(Constant.apiUrl + `carousel/show/${id}`)
            .then(res => res.json())
            .then(res => {

                this.state.mangaList.forEach(e => {
                    if(e.id_manga == res.id_manga){
                        res.name = e.name
                    }
                })

                this.setState({
                    imgSrc : res.url,
                    editModal : 'block',
                    idEditTarget : res.id,
                    selectManga : res.id_manga,
                    targetMangaName : res.name,
                    targetMangaId : res.id_manga
                } )
            })
    }

    _deleteBtnHandler(id){
        swal.fire({
            title: 'Are you sure to delete this Carousel?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                this._deleteToDatabase(id)
                
            }
        })
    }

    _deleteToDatabase(id){
        fetch(Constant.apiUrl + `carousel` , {
            method : 'DELETE',
            headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                    data: {
                        id: id
                    }
            })
        }).then(res => res.json())
            .then(res => {
                if(res.status){
                    this.setState({
                        value : 0,
                    });
                    this._resetAddModal();
                    this._getCarousel();
                    swal.fire(
                        'Deleted!',
                        'Collection has been deleted.',
                        'success'
                    )
                }
            })
    }

    componentDidMount(){
        document.title = "Carousels | Dewa Komik";
        this._getCarousel();
        this._getMangaList();
    }
    _getMangaList() {

        this.setState({
            mangaList: []
        } , () => {
            let apiUrl = Constant.apiUrl + `manga/list`;

            fetch(apiUrl)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        mangaList: res
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        });

        
    }

    _getCarousel(){
        this.setState({
            dataCarousel : []
        } , () => {
            fetch(Constant.apiUrl + `carousel`)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        dataCarousel : res
                    })
            })
        })
    }

    _validateAdd(){
                if(this.state.selectManga !== 'default'){        
                    if (this.state.imgSrc == '') {
                        this.setState({
                            imgSrcErr: true
                        })
                    } else {
                        try {
                            if (this.imageExists(this.state.imgSrc)) {
                                return true;
                            } else {
                                this.setState({
                                    imgSrcErr: true
                                });
                            }    
                        } catch (error) {
                            return false;
                        }
                        
                    }
                }else{
                    this.setState({
                        selectMangaValidate: true
                    });
                }


                return false;
            
        

        return false;
    }

    imageExists(image_url) {

        var http = new XMLHttpRequest();

        http.open('HEAD', image_url, false);
        http.send();

        return http.status != 404;

    }

    _addCarousel(){
        if(this.method.validateAdd()){
            // tambah ke database
            this._sendToDatabase();
        }else{
            this._resetAddModal();
            swal.fire({
                icon: "error",
                type: "error",
                title: "Image Forbidden!",
                text: "Image Request blocked by CORS Policty"
            });
        }

    }
    
    _editToDatabase(){
        fetch(Constant.apiUrl + `carousel`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        imgSrc: this.state.imgSrc,
                        id : this.state.idEditTarget,
                        id_manga : this.state.selectManga
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    this._resetAddModal();
                    this._getCarousel();
                    this._getMangaList();
                }
            })
    }

    _sendToDatabase(){
        fetch(Constant.apiUrl + `carousel` , {
            method : 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    imgSrc: this.state.imgSrc,
                    id_manga : this.state.selectManga
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                // console.log(res);
                if(res.status) {
                    this._resetAddModal();
                    this._getCarousel();
                    this._getMangaList();
                }
            })
    }

    _resetAddModal(){
        this.setState({
            addModal : 'none',
            editModal : 'none',
            imgSrc : '',
            selectGenre : 'default',
            selectMangaValidate : false,
            imgSrcErr : false,
            selectManga : 'default'
        });
    }

    
    
    render(){
        return (
            <div class="page">
                <div class="page-header">
                  <h1 class="page-title">Carousel</h1>
                </div>

                <div class="page-content">
                    
                    <div class="panel">
                    <div class="panel-body">
                        <div style={{position : 'absolute' , right : 20 , top : -60}}>
                            <button onClick={() => {
                                    if(this.state.dataCarousel.length <= 4){
                                        this.setState({
                                            addModal: 'block'
                                        })
                                    }else{
                                        swal.fire({
                                            icon: 'error',
                                            type: 'error',
                                            title: 'Oops...',
                                            text: 'You have reached maximum carousel ! ',
                                        })
                                    }
                                    
                                }} className='btn btn-primary d-flex align-items-end align-self-end'>Add Carousel</button>
                        </div>

                            {/* content */}
                        
                        {/* <Carousel showArrows={true}>

                        {
                            this.state.dataCarousel.map(e => (
                                <div>
                                    <img src={e.url} />
                                    <button className="btn btn-success position-absolute" style={{
                                        zIndex : 99,
                                        right : 90,
                                        bottom : -10
                                    }} data-id={e.id} onClick={({target}) => {
                                        const id = target.getAttribute('data-id');
                                        this._editBtnHandler(id);
                                    }}>Edit</button>
                                    <button className="btn btn-danger position-absolute" style={{
                                        zIndex : 99,
                                        right : 10,
                                        bottom : -10
                                    }} data-id={e.id} onClick={({target}) => {
                                        const id = target.getAttribute('data-id');
                                        this._deleteBtnHandler(id);
                                    }}>Delete</button>
                                </div>
                            ))
                        }
                                
                        </Carousel> */}

                        <Carousel 
                            arrows
                            value={this.state.value}
                            centered
                            onChange={(val) => { this.setState({ value : val}) }}
                            slides={this.state.dataCarousel.map(e => {
                                return (
                                    <img src={e.url} />
                                )
                            })}
                        />
                        <Dots number={this.state.dataCarousel.length} thumbnails={this.state.dataCarousel.map(e => {
                                return (
                                    <img style={{width : 100 , height : 70}} src={e.url} />
                                )
                            })} value={this.state.value} onChange={(val) => { this.setState({ value : val}) }}  />
                        <div className="row justify-content-center">
                            <button className="btn btn-success" 
                                onClick={() => { this._editBtnHandler(this.state.dataCarousel[this.state.value].id) }}>Edit</button>
                            
                            <button className="btn btn-danger ml-3" 
                                onClick={() => { this._deleteBtnHandler(this.state.dataCarousel[this.state.value].id) }}>Delete</button>
                        </div>
                        

                        


                    </div>
                    </div>
                    

                    
                    

                </div>

                {/* modal add */}

                <div class="modal" id="modalAdd" role="dialog" style={ {display : this.state.addModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new Carousel</h5>
                            <button onClick={() => { this._resetAddModal() }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                                <div className='example'>
                                    <form autocomplete="off">
                                    <div class="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <select className={`form-control ${this.state.selectMangaValidate ? 'is-invalid' : '' }`} onChange={obj => {this.setState({ selectManga : obj.target.value , selectMangaValidate : false })}}>
                                                    <option value="default">-- Select Manga --</option>

                                                    { this.state.mangaList.map( (e) => {
                                                        return(
                                                            <option value={e.id_manga}>{e.name}</option>
                                                        );
                                                    } ) }
                                                </select>
                                                <div class={`invalid-feedback ${this.state.selectMangaValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>Please select the manga</div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <input type="text" class={`form-control ${this.state.imgSrcErr == true ? 'is-invalid' : ''}`} placeholder="Image link" value={this.state.imgSrc} onChange={({target}) => {
                                                this.setState({imgSrc : target.value , imgSrcErr : false});
                                            }}/>
                                            <div class={`invalid-feedback ${this.state.imgSrcErr == true ? 'd-block' : 
                                            'd-none'}`}>
                                                Your image is not valid!
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="row justify-content-center">
                                        <h5>Preview</h5>
                                    </div>
                                    <div className="row justify-content-center" id='imgWrap'>
                                        <img style={{
                                            border : '1px solid rgba(0,0,0,0.5)',
                                            padding : 7,
                                            maxHeight : '100%',
                                            maxWidth : '95%'
                                        }} id="img" src={`${this.state.imgSrc}`} />
                                    </div>
                                    </form>
                                </div>
                                
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.addCarousel(); }} class="btn btn-primary">Add</button>
                            <button onClick={() => { this._resetAddModal() }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>


                {/* modal edit */}

                <div class="modal" id="modalEdit" role="dialog" style={ {display : this.state.editModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Collection</h5>
                            <button onClick={() => { this._resetAddModal(); }}  class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                                <div className='example'>
                                    <form autocomplete="off">
                                    <div class="row">
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <select className={`form-control ${this.state.selectMangaValidate ? 'is-invalid' : '' }`} onChange={obj => {this.setState({ selectManga : obj.target.value , selectMangaValidate : false })}}>
                                                    <option value={this.state.targetMangaId}>{this.state.targetMangaName}</option>

                                                    { this.state.mangaList.map( (e) => {
                                                        if(e.id_manga != this.state.targetMangaId)                       {
                                                            return(
                                                                <option value={e.id_manga}>{e.name}</option>
                                                            )
                                                        }
                                                    } ) }
                                                </select>
                                                <div class={`invalid-feedback ${this.state.selectMangaValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>Please select the manga</div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-4">
                                            <input type="text" class={`form-control ${this.state.imgSrcErr == true ? 'is-invalid' : ''}`} placeholder="Image link" value={this.state.imgSrc} onChange={({target}) => {
                                                this.setState({imgSrc : target.value , imgSrcErr : false});
                                            }}/>
                                            <div class={`invalid-feedback ${this.state.imgSrcErr == true ? 'd-block' : 
                                            'd-none'}`}>
                                                Your image is not valid!
                                            </div>
                                        </div>
                                    </div>
                                        
                                    <div className="row justify-content-center">
                                        <h5>Preview</h5>
                                    </div>
                                    <div className="row justify-content-center" >
                                        <img style={{
                                            border : '1px solid rgba(0,0,0,0.5)',
                                            padding : 7,
                                            maxHeight : '100%',
                                            maxWidth : '95%'
                                        }}  src={`${this.state.imgSrc}`} />
                                    </div>
                                    </form>
                                </div>
                                
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.editCarousel(); }} class="btn btn-warning text-white">Edit</button>
                            <button onClick={() => { this._resetAddModal() }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}