import React, { Component } from 'react';
import Constant , {genre} from './../systems/constants';
import MUIDataTable from "mui-datatables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



export default class MangaChapterScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
            addModal : 'none',
            editModal : 'none',
            showAlert : false,
            listAdd : [ {key : 0 , text : '' , invalid : false} ],
            mangaList : [],
            dataChapter : [],
            prevEdit : null,

            // form
            selectManga : 'default',
            imgUrl : '',
            chapterNum : '',
            chpTitle : '',

            // validation
            selectMangaValidate : false,
            imgUrlValidate: false,
            chapterNumValidate: false,
            chpTitleValidate: false,

            // message
            chapterNumMessage : 0,

            // target
            deleteModal: 'none',
            chapterIdTarget: null,
            chapterImgTarget: null,
            chapterTitleTarget: null,
            chapterTargetNum : null
        }

        this.method = {
            addNewRow : this._addNewRow.bind(this),
            deleteRow : this._deleteRow.bind(this),
            resetForm : this._resetForm.bind(this),
            getMangaList : this._getMangaList.bind(this),
            formValidate : this._formValidate.bind(this),
            sendChapterData : this._sendChapterData.bind(this),
            getChapterList : this._getChapterList.bind(this),
            editBtnHandler : this._editBtnHandler.bind(this),
            editApiChapter : this._editApiChapter.bind(this),
            deleteBtnHandler :this._deleteBtnHandler.bind(this),
            deleteChapter : this._deleteChapter.bind(this),
        }

        this.columns = [
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
                    name: 'mangaTitle',
                    label: 'Manga Name',
                    sortable: true,
                },
                {
                    label: 'Chapter',
                    name: 'chapter_number',
                    sortable: true,
                },
                {
                    name: 'title',
                    label: 'Chapter Title',
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
                                    <button data-id={value} type="button" data-target="#modalAdd" class="btn d-block w-100 my-1 btn-info" onClick={(e) => { this.method.editBtnHandler(e) }}>Edit</button>

                                    <button data-id={value} type="button" data-target="#deleteChapter" class="btn d-block w-100 my-1 btn-danger" onClick={(e) => { this.method.deleteBtnHandler(e) }}>Delete</button>
                                </div>
                            );
                        }
                    }
                }
            ];

    }

    _deleteChapter(){
        let apiUrl = Constant.apiUrl + `chapter/${this.state.chapterIdTarget}`;

        fetch(apiUrl , {
            method : 'DELETE',
            headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                    data: this.state.chapterIdTarget
                })
        })
            .then(res => res.json())
            .then(res => {


                if(res.status){
                    
                    this.method.resetForm();
                    toast.success(' Chapter Successfully Deleted!', {
                        containerId : 'addChapter',
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.method.getChapterList();
                }
            })
            .catch(err => {
                toast.warn(' Chapter Failed to Delete!', {
                        containerId : 'addChapter',
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
            });
    }

    _deleteBtnHandler({target}){
        let idTarget = target.getAttribute('data-id');
        let apiUrl = Constant.apiUrl + `chapter/${idTarget}`;
        let element = document.querySelector(`[data-id="${idTarget}"]`).parentNode.parentNode.parentElement.querySelectorAll('td');


        // get img chapter
        let img = element[1].children[0].getAttribute('src');
        // get title manga
        let title = element[3].textContent;
        // get chapter num
        let chapterNum = element[5].textContent;

        this.setState({
            deleteModal: 'block',
            chapterIdTarget: idTarget,
            chapterImgTarget: img,
            chapterTitleTarget: title,
            chapterTargetNum : chapterNum
        });
    }

    _editApiChapter(){
        const prevData = this.state.prevEdit;
        const nextData = {
            mangaId: this.state.selectManga,
            imgUrl: this.state.imgUrl,
            chapterNum: this.state.chapterNum,
            chapterTitle: this.state.chpTitle,
            imgList: this.state.listAdd
        }

        let apiUrl = Constant.apiUrl + `chapter/${prevData.id}`;

        fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    prevData : prevData,
                    nextData : nextData
                }
            })
        })
            .then(res => res.json())
            .then(res => {
                this._resetForm();
                this.method.getChapterList();
            })
            .catch(err => {
                console.log(err);
            })
    }

    _editBtnHandler({target : { dataset  : {id}}}){
        let apiUrl = Constant.apiUrl + `chapter/${id}`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                

                let newArray = res.imgList.map((e , i) => {
                    return {key : i , text : e.img_link , invalid :false }
                });

                this.setState({
                    editModal : 'block',
                    selMangaName : res.name,
                    selectManga : res.id_chapters,
                    imgUrl : res.image,
                    chapterNum : res.chapter_number,
                    chpTitle : res.title,
                    listAdd : newArray,
                    prevEdit : res
                });
            })
            .catch(err => console.log(err));
    }

    _getChapterList(){
        let apiUrl = Constant.apiUrl + `chapter`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    dataChapter : res
                });
            })
            .catch(err => console.log(err))
    }

    _sendChapterData(){
        let apiUrl = Constant.apiUrl + `chapter`;
        const data = {
            mangaId : this.state.selectManga,
            imgUrl : this.state.imgUrl,
            chapterNum : this.state.chapterNum,
            chapterTitle : this.state.chpTitle,
            imgList : this.state.listAdd
        }
        
        fetch(apiUrl , {
            method: 'POST',
            headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                data: data
            })
        })
            .then(res => res.json()) 
            .then(res => {
                if(res.status){
                    this._resetForm();
                    toast.success(' Chapter Successfully Added', {
                        containerId : 'addChapter',
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                    this.method.getChapterList();
                }
            })
            .catch(err => {
                toast.warn(' Chapter Failed to Add!', {
                        containerId : 'addChapter',
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
            })
    }

    async _formValidate ( data = true) {
        // select manga validate
        if(this.state.selectManga !== 'default'){
            // img url validate
            if(this.state.imgUrl !== ''){
                // chapter number validate
                if(this.state.chapterNum !== ''){
                    let apiUrl = Constant.apiUrl + `manga/list?chapternum=${this.state.chapterNum}&&id_manga=${this.state.selectManga}`;

                    let next = true;

                    await fetch(apiUrl)
                        .then(res => res.json())
                        .then(res => {
                            if(this.state.prevEdit != null){
                                this.setState({
                                        chapterNumMessage : res.status && this.state.chapterNum !== this.state.prevEdit.chapter_number ? 1 : 0,
                                        chapterNumValidate: res.status && this.state.chapterNum !== this.state.prevEdit.chapter_number ? true : false
                                    });
                                
                                if (res.status && this.state.chapterNum !== this.state.prevEdit.chapter_number) {
                                        next = false;
                                    }
                            }else{
                                this.setState({
                                    chapterNumMessage: res.status ? 1 : 0,
                                    chapterNumValidate: res.status ? true : false
                                });

                                if (res.status) {
                                    next = false;
                                }
                            }
                            
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    
                    // title check
                    if(next){

                      if (this.state.chpTitle !== ''){
                        // input list image check
                        let success = false;

                        this.state.listAdd.forEach((e, i) => {

                            let newArray = this.state.listAdd.slice();
                            newArray[i].invalid = e.text == '' ? true : false;

                            this.setState({
                                listAdd: newArray
                            });

                            success = e.text == '' ? false : true;
                        });

                        // all validation success
                        if (success) {
                            data ? this.method.sendChapterData() : this.method.editApiChapter();
                        }

                      }else{
                        this.setState({
                            chpTitleValidate: true
                        });
                      }

                    }

                }else{
                    this.setState({
                        chapterNumValidate : true
                    });
                }
            }else{
                this.setState({
                    imgUrlValidate : true
                });
            }
        }else{
            this.setState({
                selectMangaValidate : true
            });
        }
    }

    componentWillMount(){
        document.title = "Chapter List | Dewa Komik";
        this.method.getMangaList();
        this.method.getChapterList();
    }

    _getMangaList(){
        this.setState({
            dataChapter : []
        });

        let apiUrl = Constant.apiUrl + `manga/list`;

        fetch(apiUrl)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    mangaList : res
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    _resetForm(){
        this.setState({
                addModal: 'none',
                editModal : 'none',
                deleteModal : 'none',
                showAlert: false,
                listAdd: [{
                    key: 0,
                    text: '',
                    invalid: false
                }],

                // form
                selectManga: 'default',
                selMangaName : '',
                imgUrl: '',
                chapterNum: '',
                chpTitle: '',

                // validation
                selectMangaValidate: false,
                imgUrlValidate: false,
                chapterNumValidate: false,
                chpTitleValidate: false,

                // message
                chapterNumMessage: 0
        })
    }

    _deleteRow(){
        let oldArray = this.state.listAdd;
        oldArray.pop();
        
        this.setState({
            listAdd : oldArray
        });
    }


    _addNewRow(){
        let lastKey = this.state.listAdd[this.state.listAdd.length - 1].key ;
        
        this.setState({
            listAdd : [ ...this.state.listAdd , {key : lastKey + 1 , text : '' , invalid : false} ]
        });
    }




    render(){
        return (

            <div class="page">

            {/* Toast List */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover containerId={'addChapter'}
                />

            {/* Toast End */}
                <div class="page-header">
                    <h1 class="page-title">Chapters List</h1>
                    <div class="page-header-actions">
                    <a class="btn btn-sm btn-danger btn-round text-white" target="_blank" onClick={() => {this.setState({addModal : 'block'})}}>
                        <i class="icon md-plus" aria-hidden="true"></i>
                        <span class="hidden-sm-down text-white">Add Chapter</span>
                    </a>
                    </div>
                </div>

                <div class="page-content">
                    
                    <div class="panel">
                        <div class="panel-body">
                            <MUIDataTable
                                columns={this.columns}
                                data={this.state.dataChapter}
                                options={{
                                    elevation : 1,
                                    selectableRows : 'none',
                                    responsive : 'scrollFullHeight'
                                }}
                            />
                        </div>
                    </div>
                    
                    

                </div>







                {/* Modal Add Chapter */}
                
                <div class="modal" id="modalAdd" role="dialog" style={ {display : this.state.addModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add new Chapter</h5>
                            <button onClick={() => { this.setState({
                                addModal : 'none',
                                showAlert : false
                            }); this.method.resetForm(); }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                
                             <form autoComplete="off">
                                
                                <div className="row">
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

                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <input type="text" class={`form-control ${this.state.imgUrlValidate ? 'is-invalid' : '' }`}  placeholder="name@example.com" value={this.state.imgUrl} placeholder="Img chapter url..." onChange={text => {this.setState({imgUrl : text.target.value , imgUrlValidate : false})}} />
                                            <div class={`invalid-feedback ${this.state.imgUrlValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>Img link cannot be empty!</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <input type="number" class={`form-control ${this.state.chapterNumValidate ? 'is-invalid' : '' }`} placeholder="Chp..." value={this.state.chapterNum} onChange={(obj) => {this.setState({chapterNum : obj.target.value , chapterNumValidate : false})}} />
                                            <div class={`invalid-feedback ${this.state.chapterNumValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>
                                                {this.state.chapterNumMessage != 0 ? 'Chapter Already Exist!' : 'Cannot be blank!'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div class="form-group">
                                            <input type="text" class={`form-control ${this.state.chpTitleValidate ? 'is-invalid' : '' }`} placeholder="Chp Title..."
                                            value={this.state.chpTitle} onChange={text => this.setState({chpTitle : text.target.value , chpTitleValidate : false})} />
                                            <div class={`invalid-feedback ${this.state.chpTitleValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>
                                                Title cannot be Empty!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                {/* chapter list add */}

                                { this.state.listAdd.map((e , i) => {
                                    
                                    return (
                                        <div className="row">
                                            <div class="form-group col-md-10">
                                                <div class="input-group input-group-md mb-3">
                                                    <input type="text" class={`form-control col-md-10 ${ e.invalid ? 'is-invalid' : '' }`} placeholder={`Img num-${i+1} link...`} value={this.state.listAdd[i].text} 
                                                    onChange={text => 
                                                        {   
                                                            let newArray = this.state.listAdd.slice();
                                                            newArray[i] = {key : i , text : text.target.value};
                                                            this.setState({
                                                                listAdd : newArray
                                                            });
                                                        }
                                                    }
                                                    />
                                                    { i != 0 && i == this.state.listAdd.length - 1
                                                        ? (<button onClick={() => {this.method.deleteRow()}} type="button" class="close ml-2" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>) 
                                                        : null
                                                    }
                                                    
                                                </div>
                                            </div>
                                            
                                            { 
                                                 i == this.state.listAdd.length - 1
                                                    ?  (<div className="col-md-2">
                                                            <button type="button" class="btn btn-floating btn-danger btn-sm waves-effect waves-classic" onClick={() => {this.method.addNewRow()}}>
                                                                <i class="icon md-plus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>)
                                                    : null
                                            }
                                            
                                        </div>    
                                    )
                                }) }

     

                             </form>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.formValidate()  }} class="btn btn-primary">Add</button>
                            <button onClick={() => { 
                                    this.setState({addModal : 'none' , showAlert : false}) ;
                                    this.method.resetForm();
                                }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Modal Edit Chapter */}
                
                <div class="modal" id="modalEdit" role="dialog" style={ {display : this.state.editModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit Chapter</h5>
                            <button onClick={() => { this.setState({
                                editModal : 'none',
                                showAlert : false
                            }); this.method.resetForm(); }} type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                                
                             <form autoComplete="off">
                                
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <select className={`form-control ${this.state.selectMangaValidate ? 'is-invalid' : '' }`} onChange={obj => {this.setState({ selectManga : obj.target.value , selectMangaValidate : false })}}>
                                                <option value={this.state.selectManga}>{this.state.selMangaName}</option>
                                            </select>
                                            <div class={`invalid-feedback ${this.state.selectMangaValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>Please select the manga</div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <input type="text" class={`form-control ${this.state.imgUrlValidate ? 'is-invalid' : '' }`}  placeholder="name@example.com" value={this.state.imgUrl} placeholder="Img chapter url..." onChange={text => {this.setState({imgUrl : text.target.value , imgUrlValidate : false})}} />
                                            <div class={`invalid-feedback ${this.state.imgUrlValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>Img link cannot be empty!</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div class="form-group">
                                            <input type="number" class={`form-control ${this.state.chapterNumValidate ? 'is-invalid' : '' }`} placeholder="Chp..." value={this.state.chapterNum} onChange={(obj) => {this.setState({chapterNum : obj.target.value , chapterNumValidate : false})}} />
                                            <div class={`invalid-feedback ${this.state.chapterNumValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>
                                                {this.state.chapterNumMessage != 0 ? 'Chapter Already Exist!' : 'Cannot be blank!'}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div class="form-group">
                                            <input type="text" class={`form-control ${this.state.chpTitleValidate ? 'is-invalid' : '' }`} placeholder="Chp Title..."
                                            value={this.state.chpTitle} onChange={text => this.setState({chpTitle : text.target.value , chpTitleValidate : false})} />
                                            <div class={`invalid-feedback ${this.state.chpTitleValidate ? 'd-block' : 'd-none' } ml-1 mt-1`}>
                                                Title cannot be Empty!
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                {/* chapter list add */}

                                { this.state.listAdd.map((e , i) => {
                                    
                                    return (
                                        <div className="row">
                                            <div class="form-group col-md-10">
                                                <div class="input-group input-group-md mb-3">
                                                    <input type="text" class={`form-control col-md-10 ${ e.invalid ? 'is-invalid' : '' }`} placeholder={`Img num-${i+1} link...`} value={this.state.listAdd[i].text} 
                                                    onChange={text => 
                                                        {   
                                                            let newArray = this.state.listAdd.slice();
                                                            newArray[i] = {key : i , text : text.target.value};
                                                            this.setState({
                                                                listAdd : newArray
                                                            });
                                                        }
                                                    }
                                                    />
                                                    { i != 0 && i == this.state.listAdd.length - 1
                                                        ? (<button onClick={() => {this.method.deleteRow()}} type="button" class="close ml-2" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>) 
                                                        : null
                                                    }
                                                    
                                                </div>
                                            </div>
                                            
                                            { 
                                                 i == this.state.listAdd.length - 1
                                                    ?  (<div className="col-md-2">
                                                            <button type="button" class="btn btn-floating btn-danger btn-sm waves-effect waves-classic" onClick={() => {this.method.addNewRow()}}>
                                                                <i class="icon md-plus" aria-hidden="true"></i>
                                                            </button>
                                                        </div>)
                                                    : null
                                            }
                                            
                                        </div>    
                                    )
                                }) }

     

                             </form>
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.formValidate(false)  }} class="btn btn-warning text-white">Edit</button>
                            <button onClick={() => { 
                                    this.setState({editModal : 'none' , showAlert : false}) ;
                                    this.method.resetForm();
                                }} type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>

                {/* Modal delete manga */}


                <div class="modal" id="deleteChapter" role="dialog" style={ {display : this.state.deleteModal , overflowY : 'scroll' }} >
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Delete Chapter</h5>
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
                                            <img src={this.state.chapterImgTarget} className="card-manga-img" />
                                        </div>
                                        <div className="col-md-9">
                                            <p>Are you sure to delete '{this.state.chapterTitleTarget}' chapter '{this.state.chapterTargetNum}' ?</p>
                                        </div>
                                    </div>
                                </div>
                                
                            
                        </div>
                        <div class="modal-footer">
                            <button type="button" onClick={() => { this.method.deleteChapter(); }} class="btn btn-danger text-white">Sure, Delete this!</button>

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