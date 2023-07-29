


class CarService {

    api(path, method = "GET", body = null) {

        const url = "http://localhost:8080/api/v1" + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options)
    }


    async getCars() {
        try {
            let data = await this.api('/all')

            if (data.status === 200) {
                let resp = await data.json();
                return resp;

             
            } else {
                let resp = await data.json();
                
            
            }

        } catch (error) {
           console.log(error);
        }
    }



    async updateCar(car) {
        try {

            let data = await this.api(`/update`, "PUT",car);

            if (data.status === 202) {
                let resp = await data.json();

                message.success(resp, [3], console.log(""))
                return resp;
            } else {
                let resp = await data.json();

                message.error(resp.error.message, [3], console.log(""))
            }



        } catch (error) {
            console.log(error)
        }
    }


    
    

    async addCar(car) {

        try {

            let data = await this.api("/add", "POST", car)


            if (data.status === 204) {
                let resp = await data.json();
                console.log(resp);

            } else {
                let resp = await data.json();

                message.error(resp.error.message, [3], console.log(""))
            }


        } catch (error) {
            console.log(error)
        }

    }


    async deleteCar(car) {

        try {

            let data = await this.api(`/delete`, "DELETE",car)


            if (data.status === 202) {
                let resp = await data.json();
                console.log(resp);
                message.success(resp, [3], console.log(""))

            } else {
                let resp = await data.json();

              
            }


        } catch (error) {
           console.log(error)
        }

    }
}