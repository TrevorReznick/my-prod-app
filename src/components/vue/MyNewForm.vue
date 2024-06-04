<template>
  <section>
    <div class="container">
      <h1 class="text-3xl font-bold mb-4">Dettagli del Prodotto</h1>
      <div class="form-container border-2 border-purple-400 p-4 rounded-lg">
        <form>
          <div class="form-group">
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div class="form-group">
            <label for="url">URL:</label>
            <input type="url" id="url" name="url" required />
          </div>
          <div class="form-group">
            <label for="description">Descrizione:</label>
            <textarea id="description" name="description" required></textarea>
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
          <div class="form-group">
            <label for="category">Categoria:</label>
            <select id="category" name="category" required>
              <option value="1">Categoria 1</option>
              <option value="2">Categoria 2</option>
              <option value="3">Categoria 3</option>
            </select>
          </div>
          <div class="form-group">
            <label for="subcategory">Sottocategoria:</label>
            <select id="subcategory" name="subcategory" required>
              <option value="1">Sottocategoria 1</option>
              <option value="2">Sottocategoria 2</option>
              <option value="3">Sottocategoria 3</option>
            </select>
          </div>
          <button type="submit">Invia</button>
        </form>
      </div>
    </div>
  </section>
</template>
  
<style>
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
  