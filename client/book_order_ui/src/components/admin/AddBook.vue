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
                        <input type="number" name="quantity" id="quantity" v-model="book.quantity_available" class="form-control"
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
import swal from 'sweetalert2';

export default {
  name: "AddBook",
  data() {
    return {
      book: {
        title: '',
        author: '',
        price: '',
        quantity_available: ''
      },
      isEdit: false
    };
  },
  mounted() {
    this.handleRouteChange();
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler() {
        this.handleRouteChange();
      }
    }
  },
  methods: {
    handleRouteChange() {
      const id = this.$route.params.id;

      if (id) {
        this.isEdit = true;
        this.fetchBook(id);
      } else {
        this.isEdit = false;
        this.resetForm();
      }
    },

    resetForm() {
      this.book = {
        title: '',
        author: '',
        price: '',
        quantity_available: ''
      };
    },

    async fetchBook(id) {
      try {
        const { data } = await this.$http.get(`/books/${id}`);
        this.book = data;
      } catch (e) {
        console.error("Failed to fetch book data:", e);
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load book data.',
        });
      }
    },

    async addBook() {
      try {
        if (this.isEdit) {
          await this.$http.put(`/books/${this.$route.params.id}`, this.book);
          swal.fire({
            icon: 'success',
            title: 'Updated',
            text: 'Book updated successfully.',
          });
        } else {
          await this.$http.post('/books', this.book);
          swal.fire({
            icon: 'success',
            title: 'Created',
            text: 'Book added successfully.',
          });
        }

        this.$router.push('/admin/books');
      } catch (e) {
        console.error(e);
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to save book.',
        });
      }
    }
  }
};
</script>

<style lang="">

</style>