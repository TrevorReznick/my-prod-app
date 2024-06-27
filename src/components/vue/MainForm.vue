
<script>
import { ref, onMounted, isProxy, toRaw} from 'vue'
import { 
  getCategories, 
  getSubCategories, 
  getProviders,  
  getMain,
  sendData,
  updateData
} from '../../scripts/requests';

export default {
  props: {
    id: String,
    email: String
  },
  setup(props) {
    const categories = ref([])
    const category = ref(null)
    const description = ref('')
    const filteredSubcategories = ref([])
    const main = ref([])
    const message = ref('')
    const name = ref('')
    const providers = ref([])
    const ratings = ref(1) // Inizializziamo con un valore predefinito come "1"
    const subcategories = ref([])
    const subcategory = ref(null)
    const subcategoryInput = ref('')
    const url = ref('')
    const id = ref(null)

    /* imported api */
    const fetchCategories = async () => {
      try {
        categories.value = await getCategories()
      } catch (error) {
        console.error(error)
      }
    }

    const fetchSubCategories = async () => {
      try {
        subcategories.value = await getSubCategories()
      } catch (error) {
        console.error(error)
      }
    }

    const fetchProviders = async () => {
      try {
        providers.value = await getProviders()
      } catch (error) {
        console.error(error)
      }      
    }

    const doMainForm = async () => {
      const form_data = {
        id_cat: category.value,
        id_sub_cat: subcategory.value,
        ratings: ratings.value,
        url: url.value,
        description: description.value,
        name: name.value      
      }
      const result = await sendData(form_data)
      if (result.success) {
        console.log('Post avvenuto con successo!')
        message.value = 'Post avvenuto con successo!'
        setTimeout(() => {
          message.value = ''
        }, 5000)
      } else {
        console.log(`Errore: ${result.error}`)
        message.value = `Errore: ${result.error}`
        setTimeout(() => {
          message.value = ''
        }, 5000)
      }
    }

    doUpdateTable = async (id) => {
      const form_data = {
        id_src: id,
        user_id: props.id
      }
    }
    
    /* other api */

    const filterSubcategories = () => {
      console.log('filtering sub cat')
      const query = subcategoryInput.value.toLowerCase()
      console.log('input', query)
      filteredSubcategories.value = subcategories.value.filter(sub => sub.sub_cat_name.toLowerCase().includes(query))      
      const obj = JSON.parse(JSON.stringify(filteredSubcategories.value))
      console.log(obj)
    }

    const selectSubcategory = (element) => {
      console.log('select sub cat')
      subcategory.value = element
      filteredSubcategories.value = []
    }

    
    onMounted(() => {      
      fetchCategories()
      fetchSubCategories()
      fetchProviders()
      console.log('ID from props:', props.id)
      console.log('Email from props:', props.email)
    })

   return {
      category,
      categories,
      description,
      doMainForm, // Assicurati di restituire la funzione sendData se vuoi usarla nel template      
      filteredSubcategories,
      filterSubcategories,//method
      message,
      name,      
      ratings,
      selectSubcategory, //method,
      subcategory,
      subcategoryInput,
      subcategories,
      url,
      id
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="text-3xl font-bold mb-4">Inserisci nuovo sito</h1>
      <div class="form-container border-2 border-purple-400 p-4 rounded-lg">
        <form @submit.prevent="doMainForm()">
          <div class="my-form">
            <div class="sx">
              <div class="form-group">
                <label for="name">Nome:</label>
                <input 
                  class="border border-black" 
                  type="text" 
                  id="name" 
                  name="name"
                  v-model="name"
                  required />
              </div>
              <div class="form-group">
                <label for="url">URL:</label>
                <input 
                  class="border border-black" 
                  type="url" 
                  id="url" 
                  name="url"
                  v-model="url"
                  required 
                />
              </div>
              <div class="form-group">
                <label for="description">Descrizione:</label>
                <textarea 
                  class="border border-black" 
                  id="description" 
                  name="description"
                  v-model="description"
                  required
                >
                </textarea>
              </div>
              <div class="form-group">
                <label for="ratings">Valutazioni:</label>
                <div id="ratings" class="ratings">
                  <input type="radio" id="star5" name="ratings" value="5" />
                  <label for="star5" title="5 stelle">★</label>
                  <input type="radio" id="star4" name="ratings" value="4" />
                  <label for="star4" title="4 stelle">★</label>
                  <input type="radio" id="star3" name="ratings" value="3" />
                  <label for="star3" title="3 stelle">★</label>
                  <input type="radio" id="star2" name="ratings" value="2" />
                  <label for="star2" title="2 stelle">★</label>
                  <input type="radio" id="star1" name="ratings" value="1" />
                  <label for="star1" title="1 stella">★</label>
                </div>
              </div>
            </div>
            <div class="dx">
              <div class="form-group">
                <label for="subcategory">Categoria:</label>
                <select 
                  id="category" 
                  name="category"               
                  v-model="category" 
                  required
                >
                  <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.cat_name }}</option>
                </select>
              </div>
              <div class="form-group">
                <label for="subcategory">Sottocategoria:</label>
                  <!-- Campo di input per l'autocompletamento -->
                <input
                  type="text"
                  v-model="subcategory"
                  @input="filterSubcategories"
                  placeholder="Start typing to search subcategories..."
                />
                <ul>
                  <li v-for="sub in filteredSubcategories" :key="sub.id" @click="selectSubcategory(sub.id)">
                    {{ sub.sub_cat_name }}
                  </li>
                </ul>
              </div>              
            </div>
          </div>
          <button type="submit">Invia</button>
        </form>
        <div v-if="message" class="notification">{{ message }}</div>
      </div>

    </div>
  </section>
</template>
  
<style scoped>
/* notification */
.notification {
  padding: 1em;
  margin: 1em 0;
  border: 1px solid #ccc;
  background-color: #e0ffe0;
  color: #007700;
}

.section {
  position: relative;
}
.form-container {
  width: 600px !important;
  margin-top: 2rem;
}
.my-form {
  display: flex;
  flex-direction: row;
}
.dx {
  padding-left: 2rem;
}
.ratings {
  display: flex;
  flex-direction: row;
}
.ratings input {
  display: none;
}
.ratings label {
  font-size: 2rem;
  color: gray;
  cursor: pointer;
}
.ratings input:checked ~ label {
  color: gold;
}
.ratings label:hover,
.ratings label:hover ~ label {
  color: gold;
}
/*autocompletition */
ul {
  border: 1px solid #ccc;
  margin: 0;
  padding: 0;
  list-style-type: none;
  max-height: 150px;
  overflow-y: auto;
}

li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #f0f0f0;
}

</style>


