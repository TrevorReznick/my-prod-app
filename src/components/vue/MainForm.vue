
<script>
import { ref, onMounted } from 'vue'
import { 
  getCategories, 
  getSubCategories, 
  getProviders,  
  getMain
} from '../../scripts/requests';

export default {
  //
  setup() {
    const name = ref('')
    const url = ref('')
    const description = ref('')
    const ratings = ref(1) // Inizializziamo con un valore predefinito come "1"
    const category = ref(null)
    const subcategory = ref(null)
    const subcategories = ref([])
    const categories = ref([])
    const providers = ref([])
    const main = ref([])

    // Eventualmente, puoi aggiungere ulteriori logiche all'interno di onMounted o altri lifecycle hooks

    const api_prod = 'https://bookmarks-list.netlify.app/api/v1/'
    const api_dev = 'http://localhost:4321/api/v1/'

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
    
    const sendData = async () => {
      const data_ = {
        id_cat: category.value,
        id_sub_cat: subcategory.value,
        ratings: ratings.value,
        url: url.value,
        description: description.value,
        name: name.value              
      }

      // Esempio di invio dei dati (assumendo che tu abbia un'API per questo)
      try {
        const response = await fetch(api_prod + 'main', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data_)
        })
        const result = await response.json()
        console.log(result)
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      fetchCategories()
      fetchSubCategories()
      fetchProviders()
      //getMain()
    })

    return {
      name,
      url,
      description,
      ratings,
      category,
      subcategory,
      subcategories,
      categories,
      sendData // Assicurati di restituire la funzione sendData se vuoi usarla nel template
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="text-3xl font-bold mb-4">Inserisci nuovo sito</h1>
      <div class="form-container border-2 border-purple-400 p-4 rounded-lg">
        <form @submit.prevent="sendData">
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
                <select 
                  id="subcategory" 
                  name="subcategory" 
                  v-model="subcategory"
                  required
                >
                  <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">{{ subcategory.sub_cat_name }}</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit">Invia</button>
        </form>        
      </div>

    </div>
  </section>
</template>
  
<style scoped>

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

</style>
