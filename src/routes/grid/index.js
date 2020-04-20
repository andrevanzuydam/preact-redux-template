import { Component } from 'preact';
import DataTableGrid from "../../components/data-table";

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

            const data = [{id: 1, name: "Test"},  {id: 2, name: "Something"}]
            return (
                <DataTableGrid title="Example Grid" name="testGrid" columns={columns} data={data}  />
            );
        }
    }
}

export default Grid;