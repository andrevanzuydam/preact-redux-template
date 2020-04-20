import { Component } from "preact";
import Helmet from "preact-helmet";


class BSInput extends Component {
    state = { isLoading: false, type: 'text', placeHolder: 'Some Text', label: 'test Label', name : 'testName', value: 'testValue', autocomplete: 'off', options: null, optionsURL: null };
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { optionsURL, options } = this.props;

        //If there is an optionURL
        if (optionsURL) {
            this.setState({isLoading: true});
            fetch(optionsURL)
                .then(res => res.json())
                .then(
                    (result) => {
                        result.data.push ({id:"", name:"Choose"});
                        this.setState({isLoading: false, options: result.data});
                        this.render();
                    });
        }

        if (options) {
            this.setState( { isLoading: false, options: options});
        }


    }

    render() {
        //console.log ('bs-input render', this.props);
        const { type, label, name, value, autocomplete, required, cols } = this.props;
        let {placeholder} = this.props;
        const {options, isLoading} = this.state;
        const colSpacing = (cols) ? `col-md-${cols}` : `col-md-6`;
        const formGroupClass = `form-group ${colSpacing}`;

        if (isLoading) return (<>Loading...</>);

        if (!placeholder) {
            placeholder = label;
        }

        const selectOptions = (options) ? options.map(function (option) {
            if (option.id == value) {
                return (<option selected="true" value={option.id}>{option.name}</option>);
            } else {
                return (<option value={option.id}>{option.name}</option>);
            }

        }) : <option>None</option>;

        const isRequired = (required == "true") ? true : false;

        if (type == "textarea") {
            return ( <div className={formGroupClass}>
                <label htmlFor={name}>{label}</label>
                <textarea className="form-control" id={name} name={name} onChange={this.props.onChange} required={isRequired} >{value}</textarea>
            </div>);
        }
          else
        if (type == "select") {
            return ( <div className={formGroupClass}>
                <label htmlFor={name}>{label}</label>
                <select className="form-control" id={name} name={name} onChange={this.props.onChange} required={isRequired} >
                    {selectOptions}
                </select>
            </div>);
        }
        else
        if (type == "dateInput")  {
            return (
                <div className={formGroupClass}>
                <label for={name}>{label}</label>
                <input className="form-control" type="text" id={name} name={name} value={value} placeholder={placeholder} onChange={this.props.onChange} required={isRequired} />
                    <Helmet><script>{`  
                        $('#${name}').datepicker({
                        format: "yyyy-mm-dd",
                        startDate: '1900-01-01',
                        clearBtn: true
                    });
                    `}</script></Helmet>
                </div>);


        }
        else {
            return (
                <div class={formGroupClass}>
                    <label for={name}>{label}</label>
                    <input class="form-control" id={name} name={name} type={type} placeholder={placeholder}
                           value={value} autoComplete={autocomplete} onChange={this.props.onChange} required={isRequired} />
                </div>
            );
        }
    }
}

export default BSInput;