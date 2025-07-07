<template lang="">
    <div class="row mt-5">
        <div class="col-md-10 m-auto">
            <div class="card card-body text-center">
                <h2>List of Book for Sale</h2>
                <table class="table table-striped mt-4">
                    <thead>
                        <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(book, index) of books" :key="index">
                            <th scope="row">{{index+1}}</th>
                            <td>{{book?.title}}</td>
                            <td>{{book?.author}}</td>
                            <td>{{book?.quantity_available}}</td>
                            <td>Rp{{book?.price}}</td>
                            <td>
                                <router-link :to="{name: 'AddBook', params: { id: book?.id }}" class="btn btn-sm btn-primary">Update</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ListBook",
    data() {
        return {
            books: []
        }
    },
    mounted() {
        this.getBooks();
    },
    methods: {
        async getBooks() {
            try {
                const {data} = await this.$http.get('/books');
                this.books = data?.items;
            } catch (e) {
                console.error(e);
            }
        },
    }
}
</script>
<style lang="">

</style>