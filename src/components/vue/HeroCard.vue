<script>
import { ref, onMounted} from 'vue'

import { getInfo } from '../../scripts/requests'

export default {
    name: 'Site Card',    
    props: {
        obj: Object
    },
        setup(props) {
        const id =  props.obj.id
        const name =  props.obj.name
        const id_cat = props.obj.id_cat
        const ratings =  props.obj.ratings
        const url =  props.obj.url
        const description = props.obj.description
        const main_category = props.obj.main_category
        const category = main_category.cat_name
        const thumb = ref('')

        const fetchInfo = async (url) => {
            console.log('Calling getInfo...')
            const response = await getInfo(url)
            console.log('getInfo response:', response) // <--- Add this line
            const base64ImageData = response.data
            //console.log('base64ImageData:', base64ImageData) // <--- Add this line
            const decodedImageData = atob(base64ImageData.split(',')[1])
            thumb.value = `data:image/jpeg;base64, ${decodedImageData}`
            //const imageBlob = new Blob([decodedImageData], { type: 'image/jpeg' })
            //thumb.value = URL.createObjectURL(imageBlob)
        }
           
        /*catch (error) {
            console.error(error)
        }*/


        onMounted(() => {
            fetchInfo(url)
        })

        return {
            id,
            name,
            id_cat,
            ratings,
            url,
            description,
            /*main_category*/
            category,
            thumb
        }
  }

}

</script>


<template>
    <li class="link-card">
        <a :href="url" target="blank">
            <h2>
                {{ name }}
                <span>&rarr;</span>
            </h2>
            <p>
                {{ description }} -- {{ category }}
            </p>
            <img :src="thumb" alt="Thumbnail" width="300" height="300" />
        </a>
    </li>
</template>
  
<style>
.link-card {
    list-style: none;
	display: flex;
    flex-direction: row;
	padding: 0.25rem;
	background-color: white;
	background-image: none;
	background-size: 400%;
	border-radius: 0.6rem;
	background-position: 100%;
	transition: background-position 0.6s cubic-bezier(0.22, 1, 0.36, 1);
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.link-card > a {
	width: 100%;
	text-decoration: none;
	line-height: 1.4;
	padding: 1rem 1.3rem;
	border-radius: 0.35rem;
	color: #111;
	background-color: white;
	opacity: 0.8;
}
h2 {
	margin: 0;
	font-size: 1.25rem;
	transition: color 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
p {
	margin-top: 0.5rem;
	margin-bottom: 0;
	color: #444;
}
.link-card:is(:hover, :focus-within) {
	background-position: 0;
	background-image: var(--accent-gradient);
}
.link-card:is(:hover, :focus-within) h2 {
	color: rgb(var(--accent));
}
</style>
