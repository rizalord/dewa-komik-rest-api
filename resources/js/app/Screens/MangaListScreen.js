import React, { Component } from 'react';
import Constant , {genre} from './../systems/constants';
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from "react-toastify";



export default class MangaListScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            dataManga : [],
            addModal : 'none',
            editModal : 'none',
            deleteModal : 'none',
            genre : genre,
            showAlert : false,
            alertText : '',
            alertClass : 'danger',

            // target
            mangaIdTarget : null,
            mangaImgTarget : null,
            mangaTitleTarget : null,

            // form
            mangaIdUpdate : null,
            mangaTitle : '',
            mangaImg : '',
            mangaSummary : '',
            mangaAuthor : '',
            mangaStatus : 'status',
            mangaFeatured : 'featured',
            mangaGenre : [],

        }

        this.tableForm =[
                {
                    name: 'image',
                    label : " ",
                    sortable : false,
                    options : {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (    
                                <img src={value} className="card-manga-img" />
                            );
                        }
                    }
                },
                {
                    name: 'name',
                    label: 'Name',
                    sortable: true,
                },
                {
                    label: 'Status',
                    name: 'status',
                    sortable: true,
                    options : {
                        customBodyRender : (value) => {
                            return (
                                <span className={`badge badge-${value == 0 ? 'danger' : 'success'}`}>
                                    { value == 0 ? 'Completed' : 'Ongoing' }
                                </span>
                            )
                        }
                    }
                },
                {
                    name: 'featured',
                    label: 'Featured',
                    sortable: true,
                    options  : {
                        customBodyRender : value => {
                            return (
                                value == 0 
                                    ? '-' 
                                    : <i className="icon md-star" style={{ fontSize : 20  }}></i> 
                            )
                        }
                    }
                },
                {
                    name: 'views',
                    label: 'Views',
                    sortable: true,
                },
                {
                    label: 'Created at',
                    name: 'created_at',
                    sortable: true,
                },
                {
                    name: "id_manga",
                    label : 'Action',
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <div>
                                    <button data-id={value} type="button" data-target="#modalAdd" class="btn d-block w-100 my-1 btn-info" onClick={(e) => { this.method.editBtnHandler(e) }}>Edit</button>

                                    <button data-id={value} type="button" data-target="#deleteManga" class="btn d-block w-100 my-1 btn-danger" onClick={(e) => { this.method.deleteBtnHandler(e) }}>Delete</button>
                                </div>
                            );
                        }
                    }
                }
            ];

        this.method = {
            getAllManga : this._getAllManga.bind(this),
            showAlert : this._showAlert.bind(this),
            onGenreChange : this._onGenreChange.bind(this),
            addMangaHandler : this._addMangaHandler.bind(this),
            addNewMangaToApi : this._addNewMangaToApi.bind(this),
            editBtnHandler : this._editBtnHandler.bind(this),
            deleteBtnHandler : this._deleteBtnHandler.bind(this),
            deleteManga : this._deleteManga.bind(this)

        }

    }

    _deleteManga(){
        let apiUrl = Constant.apiUrl + `manga/${this.state.mangaIdTarget}`;


        fetch(apiUrl , {
            method : 'DELETE',
            headers : {
                'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then(res => res.json())
            .then(response => {
                
                this.setState({
                    deleteModal : 'none',
                } , ( ) => {
                    toast.success(`  Manga Successfully Deleted!`, {
                    containerId: "addChapter",
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                    this._resetForm();
                    this.method.getAllManga();
                });

            })
            .catch(err => { 
                console.log(err);
             })
    }

    _deleteBtnHandler({target}){
        let idTarget = target.getAttribute('data-id');
        let apiUrl = Constant.apiUrl + `manga/${idTarget}`;
        let element = document.querySelector(`[data-id="${idTarget}"]`).parentNode.parentNode.parentElement.querySelectorAll('td');

        // get img manga
        let img = element[1].children[0].getAttribute('src');
        // get title manga
        let title = element[3].textContent;
        


        this.setState({
            deleteModal : 'block',
            mangaIdTarget : idTarget,
            mangaImgTarget : img,
            mangaTitleTarget : title
        });

    }


    _editBtnHandler({target}){
        let idTarget = target.getAttribute('data-id');
        let apiUrl = Constant.apiUrl + `manga/${idTarget}`;

        
        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    mangaIdUpdate : res.id_manga,
                    mangaTitle: res.name,
                    mangaImg: res.image,
                    mangaSummary: res.summary,
                    mangaAuthor: res.author,
                    mangaStatus: res.status == 1 ? 'ongoing' : 'completed',
                    mangaFeatured: res.featured == 1 ? 'yes' : 'no',
                    mangaGenre: res.genres.split(', '),
                    editModal : 'block'
                });
            })
            .catch(err => {
                console.log("errornya : ", err)
            });

    }

    componentWillMount(){
        
        document.title = "Manga List | Dewa Komik";
        this._getAllManga();
        
    }


    _addNewMangaToApi(status){
        
        let apiUrl = this.state.mangaIdUpdate == null ? Constant.apiUrl + 'manga' : Constant.apiUrl + `manga/${this.state.mangaIdUpdate}`;

        let data =  {
            idManga : this.state.mangaIdUpdate,
            mangaTitle: this.state.mangaTitle,
            mangaImg: this.state.mangaImg,
            mangaSummary: this.state.mangaSummary,
            mangaAuthor: this.state.mangaAuthor,
            mangaStatus: this.state.mangaStatus,
            mangaFeatured: this.state.mangaFeatured,
            mangaGenre: this.state.mangaGenre,
        }

        fetch(apiUrl , {

            method : status == 'add' ? "POST" : "PUT",
            headers : {
                'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ data : data })

        }).then(res => res.json() )

            .then(res => {
                toast.success(`  Manga Successfully ${status == 'add' ? 'Added!' : 'Edited!'}`, {
                    containerId: "addChapter",
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                this.method.getAllManga();
            })

            .catch( err => { console.log("errornya : " , err) });

    }

    _addMangaHandler(status = 'add'){


        

        if(this.state.mangaTitle == '' || this.state.mangaImg == '' || this.state.mangaSummary == '' || this.state.mangaAuthor == '' || this.state.mangaStatus == 'status' || this.state.mangaFeatured == 'featured' ||this.state.mangaGenre.length == 0 ){

            this.method.showAlert('danger' , 'Field is empty!');
        }else {

            // send data
            this.method.addNewMangaToApi(status);
            

            // reset all form
            this.setState({
                addModal : 'none',
                editModal : 'none',
                showAlert : false,
                mangaTitle: '',
                mangaImg: '',
                mangaSummary: '',
                mangaAuthor: '',
                mangaStatus: 'status',
                mangaFeatured: 'featured',
                mangaGenre: [],
            });

            document.querySelectorAll('input[type=checkbox').forEach(e => {
                e.checked = false;
            });

        }
    }


    _getAllManga(){
        let apiUrl = Constant.apiUrl + 'manga';
        this.setState({
            dataManga : []
        });


        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {

                console.log(response);
                
                this.setState({
                    dataManga : response
                });
            }); 

    }


    _showAlert(klas , text){
        this.setState({
            alertClass : klas,
            showAlert : true,
            alertText : text
        })
    }

    _resetForm(){
        this.setState({
            mangaIdUpdate : null,
            mangaTitle: '',
            mangaImg: '',
            mangaSummary: '',
            mangaAuthor: '',
            mangaStatus: 'status',
            mangaFeatured: 'featured',
            mangaGenre: [],
        })
    }

    _onGenreChange(checkbox , text){
        


        this.setState({
            mangaGenre: checkbox.target.checked ? [...this.state.mangaGenre, text] : this.state.mangaGenre.filter(element => element !== text)
        });
        
        
    }










    render(){
        return (

            <div class="page">

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover containerId={'addChapter'}
                />

                <div class="page-header">
                    <h1 class="page-title">Manga List</h1>
                    <div class="page-header-actions">
                    <a class="btn btn-sm btn-danger btn-round text-white" target="_blank" onClick={() => {this.setState({addModal : 'block'})}}>
                        <i class="icon md-plus" aria-hidden="true"></i>
                        <span class="hidden-sm-down text-white">Add Manga</span>
                    </a>
                    </div>
                </div>

                <div class="page-content">
                    
                    <div class="panel">
                    <div class="panel-body">
                        {/* <table class="table table-hover dataTable table-striped w-full" data-plugin="dataTable">
                        <thead>
                            <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Views</th>
                            <th>Created at</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Featured</th>
                            <th>Views</th>
                            <th>Created at</th>
                            <th>Action</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            { this.state.dataManga.map(element => 
                                (
                                    <tr>
                                        <td>
                                            <img src={element.image} className="card-manga-img" />
                                        </td>
                                        <td>
                                            {element.name}
                                        </td>
                                        <td>
                                            <span className={`badge badge-${element.status == 0 ? 'danger' : 'success'}`}>
                                                { element.status == 0 ? 'Completed' : 'Ongoing' }
                                            </span>
                                        </td>
                                        <td>
                                            {
                                                 element.featured == 0 
                                                    ? '-' 
                                                    : <i className="icon md-star" style={{ fontSize : 20  }}></i> 
                                            }
                                            
                                        </td>
                                        <td>{ element.views }</td>
                                        <td>{ element.created_at }</td>
                                        <td style={{ display : 'flex' , flexDirection : 'column' }}>
                                            <button data-id={element.id_manga} type="button" data-target="#modalAdd" class="btn d-block w-100 my-1 btn-info" onClick={(e) => { this.method.editBtnHandler(e) }}>Edit</button>
                                            <button data-id={element.id_manga} type="button" data-target="#modalAdd" class="btn d-block w-100 my-1 btn-danger" onClick={(e) => { this.method.editBtnHandler(e) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            ) }
                            


                            
                        </tbody>
                        </table> */}


                        <MUIDataTable
                            columns={this.tableForm}
                            data={this.state.dataManga}
                            options={{
                                elevation : 1,
                                selectableRows : 'none',
                                responsive : 'scrollFullHeight'
                            }}
                        />
                    </div>
                    </div>
                    

                    
                    
                    

                </div>

                {/* Modal Add Manga */}
                
                <div class="modal" id="modalAdd" role="dialog" style={ {display : this.state.addModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create a New Manga</h5>
                            <button onClick={() => { this.setState({
                                addModal : 'none',
                                showAlert : false
                            }) }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                
                                <div class="example">
                                    <form autocomplete="off">
                                    <div class="row">
                                        {/* Title */}
                                        <div class="form-group form-material col-md-7">
                                        <label class="form-control-label" for="title">Manga Title</label>
                                        <input type="text" class="form-control" id="title" name="title"
                                            placeholder="Title..." autocomplete="off" value={this.state.mangaTitle} onChange={text => this.setState({mangaTitle : text.target.value}) } />
                                        </div>
                                        {/* Image */}
                                        <div class="form-group form-material col-md-5">
                                        <label class="form-control-label" for="image">Image url</label>
                                        <input type="text" class="form-control" id="image" name="inputLastName"
                                                    placeholder="https://..." autocomplete="off" value={this.state.mangaImg} onChange={text => this.setState({ mangaImg: text.target.value })} />
                                        </div>
                                    </div>

                                        {/* Summary */}
                                    <div class="form-group form-material">
                                        <textarea class="form-control" placeholder="Summary" value={this.state.mangaSummary} onChange={text => this.setState({ mangaSummary: text.target.value })} />
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="example">
                                                <input type="text" class="form-control" id="author" name="author"
                                                        placeholder="Author's name..." autocomplete="off" value={this.state.mangaAuthor} onChange={text => this.setState({ mangaAuthor: text.target.value })} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="example">
                                                    <select class="form-control" value={this.state.mangaStatus} 
                                                    onChange={text => this.setState({ mangaStatus: text.target.value })}>
                                                        <option value="status">Status</option>
                                                        <option value="ongoing" >Ongoing</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="example">
                                                    <select class="form-control" value={this.state.mangaFeatured}
                                                    onChange={text => this.setState({ mangaFeatured: text.target.value })}>
                                                        <option value="featured">Featured</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                </div>
                                        </div>
                                    </div>

                                        {/* Genre */}
                                    <div class="form-group form-material">
                                        <label class="form-control-label" for="title">Genre</label>

                                        <br/>

                                        
                                        <div className="row px-2">
                                        { this.state.genre.map((e) => (
                                            <div class="checkbox-custom checkbox-default col-md-3 justify-content-center align-items-center mx-auto">
                                                <input type="checkbox" id={e} name="inputCheckbox" autocomplete="off" onChange={ 
                                                    (checkbox) => { this.method.onGenreChange(checkbox , e) } 
                                                } />
                                                <label for={e}>{e}</label>
                                            </div>
                                        )) }
                                        </div>
                                        
                                    </div>

                                    {/* alert */}
                                    { this.state.showAlert == true  ? 
                                        
                                        <div class={`alert alert-${this.state.alertClass}`} role="alert">
                                            {this.state.alertText}
                                        </div>
                                        :
                                        <div></div>
                                    }
                                        
                                    
                                    </form>
                                </div>
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.addMangaHandler() }} class="btn btn-primary">Add</button>
                            <button onClick={() => { this.setState({addModal : 'none' , showAlert : false}) }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}

                
                <div class="modal" id="modalAdd" role="dialog" style={ {display : this.state.editModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Manga</h5>
                            <button onClick={() => { this.setState({
                                        editModal : 'none',
                                        showAlert : false
                                    });
                                    this._resetForm();
                             }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                
                                <div class="example">
                                    <form autocomplete="off">
                                    <div class="row">
                                        {/* Title */}
                                        <div class="form-group form-material col-md-7">
                                        <label class="form-control-label" for="title2">Manga Title</label>
                                        <input type="text" class="form-control" id="title2" name="title2"
                                            placeholder="Title..." autocomplete="off" value={this.state.mangaTitle} onChange={text => this.setState({mangaTitle : text.target.value}) } />
                                        </div>
                                        {/* Image */}
                                        <div class="form-group form-material col-md-5">
                                        <label class="form-control-label" for="image2">Image url</label>
                                        <input type="text" class="form-control" id="image2" name="inputLastName"
                                                    placeholder="https://..." autocomplete="off" value={this.state.mangaImg} onChange={text => this.setState({ mangaImg: text.target.value })} />
                                        </div>
                                    </div>

                                        {/* Summary */}
                                    <div class="form-group form-material">
                                        <textarea class="form-control" placeholder="Summary" value={this.state.mangaSummary} onChange={text => this.setState({ mangaSummary: text.target.value })} />
                                    </div>

                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="example">
                                                <input type="text" class="form-control" id="author2" name="author"
                                                        placeholder="Author's name..." autocomplete="off" value={this.state.mangaAuthor} onChange={text => this.setState({ mangaAuthor: text.target.value })} />
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="example">
                                                    <select class="form-control" value={this.state.mangaStatus} 
                                                    onChange={text => this.setState({ mangaStatus: text.target.value })}>
                                                        <option value="status">Status</option>
                                                        <option value="ongoing" >Ongoing</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                        </div>
                                        <div class="col-md-4">
                                                <div class="example">
                                                    <select class="form-control" value={this.state.mangaFeatured}
                                                    onChange={text => this.setState({ mangaFeatured: text.target.value })}>
                                                        <option value="featured">Featured</option>
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                </div>
                                        </div>
                                    </div>

                                        {/* Genre */}
                                    <div class="form-group form-material">
                                        <label class="form-control-label" for="title">Genre</label>

                                        <br/>

                                        
                                        <div className="row px-2">
                                        { this.state.genre.map((e) => (
                                            <div class="checkbox-custom checkbox-default col-md-3 justify-content-center align-items-center mx-auto">
                                                <input type="checkbox" id={`${e}2`} name="inputCheckbox" autocomplete="off" onChange={ 
                                                    (checkbox) => { this.method.onGenreChange(checkbox , e) } 
                                                } checked={ this.state.mangaGenre.includes(e) ? true : false  }   />
                                                <label for={e}>{e}</label>
                                            </div>
                                        )) }
                                        </div>
                                        
                                    </div>

                                    {/* alert */}
                                    { this.state.showAlert == true  ? 
                                        
                                        <div class={`alert alert-${this.state.alertClass}`} role="alert">
                                            {this.state.alertText}
                                        </div>
                                        :
                                        <div></div>
                                    }
                                        
                                    
                                    </form>
                                </div>
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.addMangaHandler('edit') }} class="btn btn-warning text-white">Edit</button>
                            <button onClick={() => { 
                                this.setState({editModal : 'none' , showAlert : false}) ;
                                this._resetForm();
                            }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Modal delete manga */}


                <div class="modal" id="deleteManga" role="dialog" style={ {display : this.state.deleteModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Manga</h5>
                            <button onClick={() => { this.setState({
                                        deleteModal : 'none',
                                        showAlert : false
                                    });
                                    this._resetForm();
                             }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                
                                <div className="example">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <img src={this.state.mangaImgTarget} className="card-manga-img" />
                                        </div>
                                        <div className="col-md-9">
                                            <p>Are you sure to delete '{this.state.mangaTitleTarget}' ?</p>
                                        </div>
                                    </div>
                                </div>
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.deleteManga(); }} class="btn btn-danger text-white">Sure, Delete this!</button>

                            <button onClick={() => { 
                                this.setState({deleteModal : 'none' , showAlert : false}) ;
                                this._resetForm();
                            }} type="button" class="btn btn-secondary" data-dismiss="modal">No, Just kidding</button>
                        </div>
                        </div>
                    </div>
                </div>

                </div>
        )
    }
}