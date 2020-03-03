import React, { Component } from 'react';
import Constant from './../systems/constants';
import MUIDataTable from "mui-datatables";
import SweetAlert  from 'sweetalert2-react';
import swal from 'sweetalert2';



export default class CollectionScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            addModal : 'none',
            editModal : 'none',
            imgSrc: '',
            genreList : [],
            selectGenre : 'default',
            dataCollections : [],
            idEditTarget : null,

            // form error
            imgSrcErr : false,
            selectGenreErr : false
        }

        this.method ={
            addCollection : this._addCollection.bind(this),
            editCollection: this._editCollection.bind(this),
            validateAdd : this._validateAdd.bind(this)
        }

        this.columns = [
                {
                    name: 'url',
                    label : " ",
                    sortable : false,
                    options : {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (    
                                <img src={value} className="card-manga-img" style={{ width : 180}} />
                            );
                        }
                    }
                },
                {
                    name: 'genre',
                    label: 'Genre',
                    sortable: true,
                },
                {
                    label: 'Created at',
                    name: 'created_at',
                    sortable: true,
                },
                {
                    name: "id",
                    label : 'Action',
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <div>
                                    <button data-id={value} type="button" data-target="#modalAdd" class="btn d-block w-100 my-1 btn-info" onClick={(e) => { this._editBtnHandler(value) }}>Edit</button>

                                    <button data-id={value} type="button" data-target="#deleteChapter" class="btn d-block w-100 my-1 btn-danger" onClick={(e) => { this._deleteBtnHandler(value)  }}>Delete</button>
                                </div>
                            );
                        }
                    }
                }
            ];

        this._getCollections = this._getCollections.bind(this);

    }
    _editCollection(){
        if (this.method.validateAdd()) {
            // tambah ke database
            this._editToDatabase();
        }
    }

    _editBtnHandler(id){
        fetch(Constant.apiUrl + `collections/show/${id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    genreList : [...this.state.genreList , res.genre],
                    imgSrc : res.url,
                    editModal : 'block',
                    selectGenre: res.genre,
                    idEditTarget : res.id
                } )
            })
    }

    _deleteBtnHandler(id){
        swal.fire({
            title: 'Are you sure to delete this Collection?',
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
        fetch(Constant.apiUrl + `collections` , {
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
                    this._resetAddModal();
                    this._getCollections();
                    swal.fire(
                        'Deleted!',
                        'Collection has been deleted.',
                        'success'
                    )
                }
            })
    }

    componentDidMount(){
        document.title = "Collections | Dewa Komik";
        this._renderGenreComboBox();
        this._getCollections();
    }

    _getCollections(){
        this.setState({
            dataCollections : []
        } , () => {
            fetch(Constant.apiUrl + `collections`)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        dataCollections : res
                    })
            })
        })
    }

    _validateAdd(){
        
                    if (this.state.imgSrc == '') {
                        this.setState({
                            imgSrcErr: true
                        })
                    } else {
                        try{
                            if (this.imageExists(this.state.imgSrc)) {
                                return true;
                            } else {
                                this.setState({
                                    imgSrcErr: true
                                })
                            }
                        }catch(err){
                            return false;
                        }
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

    _addCollection(){
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
        fetch(Constant.apiUrl + `collections`, {
                method: 'PUT',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        imgSrc: this.state.imgSrc,
                        genre: this.state.selectGenre,
                        id : this.state.idEditTarget
                    }
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    this._resetAddModal();
                    this._getCollections();
                }
            })
    }

    _sendToDatabase(){
        fetch(Constant.apiUrl + `collections`, {
            mode: "cors",
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: {
                    imgSrc: this.state.imgSrc,
                    genre: this.state.selectGenre
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    this._resetAddModal();
                    this._getCollections();
                }
            });
    }

    _resetAddModal(){
        this.setState({
            addModal : 'none',
            editModal : 'none',
            imgSrc : '',
            selectGenre : 'default'
        });
        this._renderGenreComboBox();
    }

    _renderGenreComboBox(){
        this.setState({genreList : [] } , () => {
            fetch(Constant.apiUrl + `genre/popular`)
                .then(res => res.json())
                .then(res => {
                    this.setState({
                        genreList : res
                    })
                })
        })
    }
    
    render(){
        return (
            <div class="page">
                <div class="page-header">
                    <h4 class="example-title">Top Collections</h4>
                    <div class="example example-well">
                        <div class="page-header text-center">
                            <h1 class="page-title">Collection</h1>
                            <p class="page-description">
                                Top Genre Collection Manager
                            </p>
                        </div>
                    </div>
                </div>

                <div class="page-content">
                    
                    <div class="panel">
                    <div class="panel-body">
                        <div style={{position : 'absolute' , right : 20 , top : -60}}>
                            <button onClick={() => {
                                    if(this.state.genreList.length > 0){
                                        this.setState({addModal : 'block'})
                                    }else{
                                        swal.fire({
                                            icon: 'error',
                                            type : 'error',
                                            title: 'Oops...',
                                            text: 'You have reached maximum collections ! ',
                                        })
                                    }

                                }} className='btn btn-primary d-flex align-items-end align-self-end'>Add Collection</button>
                        </div>

                        <MUIDataTable
                            columns={this.columns}
                            data={this.state.dataCollections}
                            options={{
                                elevation : 0,
                                selectableRows : 'none',
                                responsive : 'scrollFullHeight'
                            }}
                        />
                    </div>
                    </div>
                    

                    
                    
                    

                </div>

                {/* modal add */}

                <div class="modal" id="modalAdd" role="dialog" style={ {display : this.state.addModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new Collection</h5>
                            <button onClick={() => { this._resetAddModal() }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                                <div className='example'>
                                    <form autocomplete="off">
                                    <div class="row">
                                        {/* Title */}
                                        <div class="form-group col-md-6">
                                            <select class={`form-control ${this.state.selectGenreErr == true ? 'is-invalid' : ''}`} value={this.state.selectGenre} onChange={({target}) => this.setState({
                                                selectGenre : target.value,
                                                selectGenreErr : false
                                            })} >
                                            <option value="default">-- Select Genre --</option>
                                            {
                                                this.state.genreList.map(e => (
                                                    <option value={e}>{e}</option>
                                                ))
                                            }
                                            </select>
                                            <div class={`invalid-feedback ${this.state.selectGenreErr ? 'd-block' : 
                                            'd-none'}`}>
                                                Please select valid genre!
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
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
                            <button type="button" onClick={() => { this.method.addCollection(); }} class="btn btn-primary">Add</button>
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
                                        {/* Title */}
                                        <div class="form-group col-md-6">
                                            <select class={`form-control ${this.state.selectGenreErr == true ? 'is-invalid' : ''}`} value={this.state.selectGenre} onChange={({target}) => this.setState({
                                                selectGenre : target.value,
                                                selectGenreErr : false
                                            })} >
                                            <option value="default">-- Select Genre --</option>
                                            {
                                                this.state.genreList.map(e => (
                                                    <option value={e}>{e}</option>
                                                ))
                                            }
                                            </select>
                                            <div class={`invalid-feedback ${this.state.selectGenreErr ? 'd-block' : 
                                            'd-none'}`}>
                                                Please select valid genre!
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6">
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
                            <button type="button" onClick={() => { this.method.editCollection(); }} class="btn btn-warning text-white">Edit</button>
                            <button onClick={() => { this._resetAddModal() }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}