import { trusted } from "mongoose";

class CrudRepository{
    constructor(model){
        this.model = model;
    }
    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.log("Somethign went wrong in crud creat");
            console.log("Something went wrong in crud create:", error);
        }
    }
    async destroy(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            console.log("Somethign went wrong in crud destroy");
        }
    }
    async get(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            console.log("Somethign went wrong in crud get");
        }
    }
    async getAll() {
        try {
            return await this.model.find({});
        } catch (error) {
            console.log("Somethign went wrong in crud destroy");
        }
    }
    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, {new : true});
        } catch (error) {
            console.log("Somethign went wrong in crud destroy");
        }
    }
}

export default CrudRepository;