import { Component ,createRef, render } from "preact";
import Helmet from "preact-helmet";
import $ from "jquery";


$.DataTable = require('datatables.net');
$.Buttons = require('./dataTablesButtons');
$.Responsive = require('./dataTablesResponsive');


class DataTableGrid extends Component {
    tableRef = createRef();
    formRef = createRef();
    modalRef = createRef();

    state = {name: 'tableName', path: 'AJAXPath', recordName: 'Record'};
    constructor(props) {
        super(props);

    }

    componentWillUnmount(){
        $('.data-table-wrapper')
            .find('table')
            .DataTable()
            .destroy(true);
    }

    clearFormData() {
        const {name, path} = this.props;
        const modalForm = `form${name}`;
        const recordId = `${name}id`;
        $(`#${recordId}`).val('');
        let data = {};

        jQuery(`#${modalForm} select, #${modalForm} input, #${modalForm} textarea`).each(function(key, element){
            if (element.name) {
                if (element.type == 'checkbox') {
                    element.checked = false;
                } else {
                    element.value = "";
                }
            }
        });
    }

    populateFormData( data, modal ) {
        const {name, path} = this.props;
        let {recordName} = this.props;
        const modalOkButtonId = `modal${name}ButtonId`;
        const modalTitle = `modalTitle${name}`;
        const modalForm = `form${name}`;
        const recordId = `${name}id`;

        if (recordName === undefined) {
            recordName = "Record";
        }

        jQuery(`#${modalOkButtonId}`).unbind('click');
        if (data.id !== undefined ) {
            if (path !== undefined) {
                fetch(`${path}/` + data.id) // Call the fetch function passing the url of the API as a parameter
                    .then(res => res.json())
                    .then(function (result) {
                        let id = jQuery(`#${recordId}`);
                        id.val(result.id);
                        $.each(result, function (key, value) {
                            if (jQuery('#' + key).is(':checkbox')) {
                                if (value === jQuery('#' + key).val()) {
                                    jQuery('#' + key).prop('checked', true);
                                } else {
                                    jQuery('#' + key).prop('checked', false);
                                }
                            } else {
                                jQuery('#' + key).val(value);
                            }
                        });
                        jQuery(`#${modalTitle}`).html(`Edit ${recordName}`);
                        jQuery(modal).modal('toggle');
                        jQuery(`#${modalOkButtonId}`).bind('click', function() { if ( jQuery(`#${modalForm}`).valid() ) { this.saveForm(false); jQuery(modal).modal('toggle'); } }.bind(this, modal, jQuery));
                    })
                    .catch(function () {
                        console.log('Could not fetch data for record');
                    });
            } else {
                jQuery(`#${modalTitle}`).html(`Edit ${recordName}`);
                let id = jQuery(`#${recordId}`);
                id.val(data.id);
                $.each(data, function (key, value) {
                    if (jQuery(`#${modalForm} input[name=${key}]`).is(':checkbox')) {
                        if (value === jQuery(`#${modalForm} input[name=${key}]`).val()) {
                            jQuery(`#${modalForm} input[name=${key}]`).prop('checked', true);
                        } else {
                            jQuery(`#${modalForm} input[name=${key}]`).prop('checked', false);
                        }
                    } else {
                        jQuery(`#${modalForm} input[name=${key}]`).val(value);
                    }
                });

                jQuery(modal).modal('toggle');
                jQuery(`#${modalOkButtonId}`).bind('click', function() { if ( jQuery(`#${modalForm}`).valid() ) { this.saveForm(false); jQuery(modal).modal('toggle'); } }.bind(this, modal, jQuery));

            }
        } else {
            this.clearFormData();
            jQuery(`#${modalTitle}`).html(`Create ${recordName}`);
            jQuery(modal).modal('toggle');
            jQuery(`#${modalOkButtonId}`).bind('click', function() { if ( jQuery(`#${modalForm}`).valid() ) { this.saveForm(true); jQuery(modal).modal('toggle'); } }.bind(this, modal, jQuery));
        }
    }

    getFormData () {
        const {name, path} = this.props;
        const modalForm = `form${name}`;
        const recordId = `${name}id`;
        let id = $(`#${recordId}`).val();
        let data = new FormData();
        data.append('id', id);


        jQuery(`#${modalForm} select, #${modalForm} input, #${modalForm} textarea`).each(function(key, element){
            console.log ('READING', element);
            if (element.name) {
                if (element.type == 'file') {
                    let fileData = element.files[0];
                    if (fileData !== undefined) {
                        data.append (element.name, fileData, fileData.name);
                    }
                    data.append(element.name, element.value);
                } else
                if (element.type == 'checkbox') {
                    if (element.checked) { data.append(element.name, element.value) } else { data.append(element.name, 0) };
                } else {
                    data.append(element.name, element.value);
                }
            }
        });

        console.log(data);

        return data;
    }

    saveForm(createRecord) {
        const {onSave} = this.props;
        console.log ('SAVING', createRecord, this.getFormData());
        if (onSave !== undefined) {
            onSave (this.getFormData());
        }
    }

    handlePopulateClick(data) {
        console.log ('POPULATE', data, jQuery(this.modalRef.current), this);
        this.populateFormData(data, this.modalRef.current);
    }

    handleDeleteClick(data) {
        const {onDelete} = this.props;
        if (onDelete !== undefined) {
            onDelete (data);
        }

    }

    componentDidMount() {
        const { name, path, columns, recordName, populateFormData, data, showOptions  } = this.props;

        console.log ('REFS',this.modalRef);


        let  tableColumns = columns;
        let componentInstance = this;

        console.log (columns);

        if ( !$.DataTable.isDataTable( `#${name}` ) ) {

            let domSettings = ``;
            if (showOptions) {
               domSettings = `<"data-table-wrapper-${name}"<"row"<"col-md-6"<"#${name}Buttons">><"col-md-4"f><"col-md-2"l>><rtip>>`;
            } else {
               domSettings = `<"data-table-wrapper-${name}"<"row"<"col-md-4"l><"col-md-4"><"col-md-4"f>><rtip>>`;
            }

            let options = {dom: domSettings,
                columns: tableColumns,
                processing: false,
                responsive: true,
                createdRow:  function (args, args2, row, data, dataIndex, cells) {
                                    console.log (args, args2, row, data, dataIndex, cells);
                                    if (showOptions) {
                                        //componentInstance.data = data;
                                        render(<><button class="btn btn-primary"
                                                         onClick={componentInstance.handlePopulateClick.bind(componentInstance,data)}>Edit
                                                </button>
                                                &nbsp;
                                                <button className="btn btn-danger"
                                                        onClick={componentInstance.handleDeleteClick.bind(componentInstance,data)}>Del
                                                </button></>
                                            , cells[cells.length-1]);
                                    }
                                }.bind(componentInstance, render, showOptions)
                ,
                buttons:[]};

            if (path) {
                options['path'] = path;
                options['serverSide'] = true;
            }

            if (data) {
                options['data'] = data;
            }

            let dataTable = $(`#${name}`).DataTable(options);

            if (showOptions) {
                componentInstance.data = null;
                render(<button class="btn btn-primary" onClick={componentInstance.handlePopulateClick.bind(componentInstance)}>Create</button>,  document.getElementById(`${name}Buttons`));
            }

            if (typeof window !== "undefined") {
                if (!window.MyDataTables) {
                    window.MyDataTables = {};
                }

                window.MyDataTables[`${name}`] = $(`.data-table-wrapper-${name}`)
                    .find('table')
                    .DataTable();
            }

        }

    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const {title, name, path, columns, formContent, recordName, showOptions } = this.props;
        console.log ('DATA-TABLE AJAX', path);

        let adjustedColumns = columns;

        if (showOptions !== undefined) {

            adjustedColumns.push ({title: "Options", width: "100px", mRender: function() { return ''; }})
        }

        const tableColumns = adjustedColumns.map (function (column) {
            if (!column.title) {
                column.title = column.data;
            }
            return (<th>{column.title}</th>);
        });

        const modalName = `modal${name}`;
        const modalTitle = `modalTitle${name}`;
        const modalForm = `form${name}`;
        const modalOkButtonId = `modal${name}ButtonId`;
        const recordId = `${name}id`;

        return (
            <div>
                <h3>{title}</h3>
                <table id={name} ref={this.tableRef} className="table table-striped table-bordered table-condensed table-sm"
                       style="width:100%">
                    <thead>
                    <tr>
                        {tableColumns}
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div>
                    <form id={modalForm} ref={this.formRef}>
                    <div ref={this.modalRef} id={modalName} className="modal" tabIndex="-1" role="dialog">
                        <div  className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id={modalTitle}>Edit {recordName}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="row">
                                        <input type="hidden" id={recordId} value="" />
                                        {formContent}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <input type="button" id={modalOkButtonId} className="btn btn-success" value="OK"/>
                                    <input type="button" className="btn btn-warning" data-dismiss="modal" value="Cancel" />
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>
                </div>
            </div>

        );
    }
}

/**
 * <Helmet><script>{`




                    function save${name}Form(newRecord) {
                        let id = $('#${recordId}').val();
                        let data = get${name}FormData();

                        if (newRecord) {
                            fetch('${path}', {method: 'POST', body: data} )
                            .then(res => res.json())
                            .then(function(result){
                               window.MyDataTables.${name}.ajax.reload(null, false);
                            })
                            .catch(function(error) {
                               console.log ('Could not create data for ${recordName}', error);
                             });

                        } else {
                            fetch('${path}/'+id, {method: 'POST', body: data} )
                            .then(res => res.json())
                            .then(function(result){
                                window.MyDataTables.${name}.ajax.reload(null, false);
                            })
                            .catch(function(error) {
                                console.log ('Could not save data for ${recordName}', error);
                             });
                         }
                    }

                    function delete${name}(id) {
                        if (confirm('Are you sure you want to delete this ${recordName}?')){
                            fetch('${path}/'+id, {method: 'DELETE'} )
                            .then(res => res.json())
                            .then(function(result){
                                window.MyDataTables.${name}.ajax.reload(null, false);
                                console.log ('Deleted', result);
                            })
                            .catch(function(error) {
                                    console.log ('Could not delete data for ${recordName}', error);
                             });
                         }
                    }


                `}</script></Helmet>
 */
export default DataTableGrid;