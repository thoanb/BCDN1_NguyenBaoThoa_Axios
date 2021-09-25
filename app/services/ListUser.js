function ListUser(){
    this.userArray = [];

    this.getList = function () {
        return axios({
            method: 'get',
            url: 'https://6146b4848f2f4e00173040ba.mockapi.io/api/v1/User',
        });
    }

    this.add = function(user){
        return axios({
            method: 'post',
            url: 'https://6146b4848f2f4e00173040ba.mockapi.io/api/v1/User',
            data:user
        });
    }

    this.getDetail = function (id) {
        return axios({
            method: 'get',
            url: `https://6146b4848f2f4e00173040ba.mockapi.io/api/v1/User/${id}`,
        });
    }

    this.update = function(user,id){
        return axios({
            method: 'put',
            url: `https://6146b4848f2f4e00173040ba.mockapi.io/api/v1/User/${id}`,
            data:user
        });
    }

    this.delete = function(id){
        return axios({
            method: 'delete',
            url: `https://6146b4848f2f4e00173040ba.mockapi.io/api/v1/User/${id}`,
        });
    }


}