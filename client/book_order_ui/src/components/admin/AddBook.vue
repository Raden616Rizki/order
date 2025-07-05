<template lang="">
    <div class="row mt-5">
        <div class="col-md-10 m-auto">
            <div class="card card-body text-center">
                <h2>Add Book for Sale</h2>
                <form @submit.prevent="addBook()">
                    <div class="form-group">
                        <label for="title" class="float-left">Title</label>
                        <input type="text" name="title" id="title" v-model="book.title" class="form-control"
                            placeholder="Enter book title" required>
                    </div>
                    <div class="form-group">
                        <label for="author" class="float-left">Author</label>
                        <input type="text" name="author" id="author" v-model="book.author" class="form-control"
                            placeholder="Enter book author name" required>
                    </div>
                    <div class="form-group">
                        <label for="price" class="float-left">Price (Rp)</label>
                        <input type="number" name="price" id="price" v-model="book.price" class="form-control"
                            placeholder="Enter book price" required>
                    </div>
                    <div class="form-group">
                        <label for="quantity" class="float-left">Quantity Available</label>
                        <input type="number" name="quantity" id="quantity" v-model="book.qantity_available" class="form-control"
                            placeholder="Enter quantity available of book" required>
                    </div>
                    <button type="submit" class="btn btn-success float-left">Submit</button>
                    <button type="reset" class="btn btn-secondary float-left ml-2">Reset</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AddBook",
    data() {
        return {
            book: {
                title: null,
                author: null,
                price: null,
                quantity_available: null
            }
        }
    },
    methods: {
        addBook() {

        }
    }
}
</script>
<style lang="">

</style>