
<script>
import { ref, onMounted, isProxy, toRaw} from 'vue'
import Card from './HeroCard.vue'
import TestCard from './TestCard.vue'
import { 
  getCategories, 
  getSubCategories, 
  getProviders,  
  getMain,
  sendData,
  updateData,
  getInfo
} from '../../scripts/requests'


export default {
  components: {
    Card,
    TestCard
  },
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
    const obj = ref({})

    /* imported api */
    const fetchCategories = async () => {
      try {
        categories.value = await getCategories()
      } catch (error) {
        console.error(error)
      }
    }

    const fetchMain = async () => {
      try {
        main.value = await getMain()
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
        name: name.value,
        id_provider: 1,
        //user_id: props.id
        user_id: '4565445'
      }
      console.log(form_data)
      const result = await sendData(form_data)
      if (result.success) {        
        const ids = result.data.map((obj) => obj.id)  // => get last id
        const last_id = ids[0]
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
    
    /* other api */

    const filterSubcategories = () => {
      const query = subcategoryInput.value.toLowerCase()
      console.log('filtering sub cat')
      /*if (query.length >= 3) { */// Inizia a filtrare solo se l'input ha almeno 3 caratteri
      filteredSubcategories.value = subcategories.value.filter(sub => sub.sub_cat_name.toLowerCase().includes(query))
      /*} else {
        filteredSubcategories.value = [] // Pulisce i risultati filtrati se l'input ha meno di 3 caratteri
      } */         
      const obj = JSON.parse(JSON.stringify(filteredSubcategories.value))
      console.log(obj)
    }

    const selectSubcategory = (id, name) => {
      console.log('select sub cat', id)
      subcategory.value = id
      subcategoryInput.value = name
      filteredSubcategories.value = []
    }
    
    onMounted(() => {      
      fetchCategories()
      fetchSubCategories()
      fetchProviders()
      fetchMain()
      /*
      console.log('ID from props:', props.id)
      console.log('Email from props:', props.email)
      */
    })

   return {
      category,
      categories,
      description,
      doMainForm, // Assicurati di restituire la funzione sendData se vuoi usarla nel template      
      filteredSubcategories,
      filterSubcategories,//method
      main,
      message,
      name,      
      ratings,
      selectSubcategory, //method,
      subcategory,
      subcategoryInput,
      subcategories,
      url,
      id,
      obj
    }
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      
    </div>
    <!--
    <div class="container">
      <Card 
        v-for="item in main" 
        :key="main[item.id]" 
        :obj="item"
      />
    </div>
    -->    
    <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Pitchfork Kickstarter Taxidermy</h1>
      <p class="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
    </div>
    <div class="flex flex-wrap w-full mb-20 flex-col items-center text-center">
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
                  v-model="subcategoryInput"
                  @input="filterSubcategories"
                  placeholder="Start typing to search subcategories..."
                />
                <ul>
                  <li v-for="sub in filteredSubcategories" :key="sub.id" @click="selectSubcategory(sub.id, sub.sub_cat_name)">
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
    <div class="flex flex-wrap -m-4">
      <Card 
        v-for="item in main"
        :key="main[item.id]" 
        :obj="item"
      />
    </div>
    <button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
  </div>
</section>

</template>
  
<style scoped>
.card {
  display: flex;
  direction: row;
}
/* notification */
.notification {
  padding: 1em;
  margin: 1em 0;
  border: 1px solid #ccc;
  background-color: #e0ffe0;
  color: #007700;
}

section {
  display: block;  
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


