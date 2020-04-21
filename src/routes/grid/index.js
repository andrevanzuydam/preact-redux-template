import { Component } from 'preact';
import DataTableGrid from "../../components/data-table";
import BSInput from "../../components/bs-input";

class Grid extends Component {
    state = {
        error: null,
        isLoaded: false,
        items: []
    };

    componentDidMount() {
        fetch("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            const columns = [{
                data: "id", title: "ID"
            }, {
                data: "name", title: "Name"
            }];

            const columns2 = [{
                data: "id", title: "ID"
            }, {
                data: "name", title: "Name"
            }];

            const formContent =  <><BSInput cols="12" label="Name" name="name" required="true" /></>;


            const data = [{id: 1, name: "Test"},  {id: 2, name: "Something"}];


            return (<>
                    <DataTableGrid formContent={formContent} title="Example Grid" name="testGrid" columns={columns} data={data} showOptions="true" />
                    <DataTableGrid formContent={formContent} title="Example Grid2" name="testGrid2" columns={columns2} data={data} />
                </>
            );
        }
    }
}

export default Grid;