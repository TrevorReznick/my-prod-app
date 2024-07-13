<script>
import { ref, onMounted } from "vue";

import { getInfo } from "../../scripts/requests";

export default {
  name: "Site Card1",
  props: {
    obj: Object,
  },
  setup(props) {
    const id = props.obj.id
    const name = props.obj.name
    const id_cat = props.obj.id_cat
    const ratings = props.obj.ratings
    const url = props.obj.url
    const description = props.obj.description
    const main_category = props.obj.main_category
    const category = main_category.cat_name
    const thumb = ref("")     

    return {
      id,
      name,
      id_cat,
      ratings,
      url,
      description,
      /*main_category*/
      category,
      thumb,
    }
  }
}
</script>

<template>
    <!--
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
    -->
    <div class="xl:w-1/3 md:w-1/2 p-4 link-card">
        <a :href="url" target="blank">
            <div class="border border-gray-200 p-6 rounded-lg">
                <div 
                    class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
                >
                    <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-6 h-6"
                        viewBox="0 0 24 24"
                    >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                </div>
                <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                    {{ name }}
                </h2>
                <p class="leading-relaxed text-base">
                    {{ description }}
                </p>
            </div>
        </a>
    </div>
    <!--
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
          The Catalyzer
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
          Neptune
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"
            ></path>
          </svg>
        </div>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
          Melanchole
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
          </svg>
        </div>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
          Bunker
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
    <div class="xl:w-1/3 md:w-1/2 p-4">
      <div class="border border-gray-200 p-6 rounded-lg">
        <div
          class="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4"
        >
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        </div>
        <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
          Ramona Falls
        </h2>
        <p class="leading-relaxed text-base">
          Fingerstache flexitarian street art 8-bit waist co, subway tile poke
          farm.
        </p>
      </div>
    </div>
    -->
    <!--</div>-->
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