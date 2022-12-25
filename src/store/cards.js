import axios from 'axios'

const cards = {
  namespaced: true,

  state(){
    return {
      cards: {},
      cardsInDeck: {},

      types: {},
      rarities: {},
      sets: {},
      filters: [
        { name: '' },
        { types: '' },
        { rarities: '' },
        { sets: '' }
      ],
      loading: false
    }
  },

  mutations:{
    UPDATE_CARDS(state, payload){
      state.cards = payload
    },

    UPDATE_FILTERED_CARDS(state, payload){
      state.filteredCards = payload
    },

    UPDATE_CARDS_IN_DECK(state, payload){
      state.cardsInDeck = payload
    },

    UPDATE_TYPES(state, payload){
      state.types = payload
    },

    UPDATE_RARITIES(state, payload){
      state.rarities = payload
    },

    UPDATE_SETS(state, payload){
      state.sets = payload
    },

    UPDATE_FILTER(state, payload){
      //Si la valeur du filtre est null (donc quand l'option du select est revenue sur la valeure de base), on la remet à null (car mettre null dans les values ne fonctionne pas)
      if(payload[1] === "null"){
        state.filters[payload[0]] = null;
      } else { //sinon on mets la valeur à l'index récupéré
        state.filters[payload[0]] = payload[1];
      }
    },

    UPDATE_LOADING_STATE(state, payload) {
      state.loading = payload;
    },

    RESET_FILTERS(state){
      state.filters['name'] = null;
      state.filters['types'] = null;
      state.filters['rarities'] = null;
      state.filters['sets'] = null;
    }
  },

  getters: {
    myFilters(state) {
      return state.filters
    }
  },

  actions:{
    async getCards(context){
      // On démarre le chargement
      context.commit('UPDATE_LOADING_STATE', true);
      //On récupère les filtres grâce au getter
      const filter = context.getters.myFilters;
      //On crée l'url de base
      let url = `https://api.pokemontcg.io/v2/cards`;
      //Si on a un filtre, on le rajoute à l'url, sinon on lance tout de suite la recherche
      if(filter.name != null || filter.types != null || filter.rarities != null || filter.sets != null) {
        url += `?q=`;
        //Pour chaque filtre on vérifie si il n'est pas changé ou n'a pas été mis null grâce à la mutation UPDATE_FILTER
        if(filter.name != null) {
          url += `name:"*${filter.name}*"`;
        }

        if(filter.types != null) {
          url += ` types:"${filter.types}"`;
        }

        if(filter.rarities != null) {
          url += ` rarity:"${filter.rarities}"`;
        }

        if(filter.sets != null) {
          url += ` set.id:"${filter.sets}"`;
        }
      }

      //On récupère les données dans une variable
      const response = await axios.get(url, {
        headers: {
          "X-Api-Key" : 'abf9e89c-d5ef-42c5-a29f-c0d8295775a4'
        }
      });
      //On stock les données récupérées et on arrête le chargement
      context.commit('UPDATE_CARDS', response.data);
      context.commit('UPDATE_LOADING_STATE', false);
    },

    async getTypes(context){
      const url = "https://api.pokemontcg.io/v2/types";

      const response = await axios.get(url, {
        headers: {
          "X-Api-Key" : 'abf9e89c-d5ef-42c5-a29f-c0d8295775a4'
        }
      });

      context.commit('UPDATE_TYPES', response.data);
    },

    async getRarities(context){
      const url = "https://api.pokemontcg.io/v2/rarities";

      const response = await axios.get(url, {
        headers: {
          "X-Api-Key" : 'abf9e89c-d5ef-42c5-a29f-c0d8295775a4'
        }
      });

      context.commit('UPDATE_RARITIES', response.data);
    },

    async getSets(context){
      const url = "https://api.pokemontcg.io/v2/sets";

      const response = await axios.get(url, {
        headers: {
          "X-Api-Key" : 'abf9e89c-d5ef-42c5-a29f-c0d8295775a4'
        }
      });

      context.commit('UPDATE_SETS', response.data);
    },

    //Action appelée quand on modifie un filtre
    filterModified(context, payload){
      //payload.target.id va récupérer l'id du filtre afin de l'identifier (si c'est pour le name, le type...) et payload.target.value sa valeur
      context.commit('UPDATE_FILTER', [payload.target.id, payload.target.value]);
      //On relance getCards avec les nouveaux filtres
      context.dispatch('getCards');
    },

    async getCardsFromDeck(context, payload){
      // On démarre le chargement
      context.commit('UPDATE_LOADING_STATE', true);

      const cards = Array.isArray(payload.cards) ? payload.cards : [payload.cards];

      const requests = cards.map(card => axios.get(`https://api.pokemontcg.io/v2/cards?q=id:"${card['card_id']}"`, {
        headers: {
          "X-Api-Key" : 'abf9e89c-d5ef-42c5-a29f-c0d8295775a4'
        }
      }));
      const responses = await Promise.all(requests);

      //On stock les données récupérées et on arrête le chargement
      context.commit('UPDATE_CARDS_IN_DECK', responses);
      context.commit('UPDATE_LOADING_STATE', false);
    },

    filterDeckModified(context, payload){
      context.commit('UPDATE_FILTER', [payload.target.id, payload.target.value]);
    },

    async deleteCard(context, payload){
      const url = `http://pokemontcg-deck-api/card/${payload.card_id}`;

      await axios.delete(url);

      context.dispatch('decks/findDeck', payload.deck_id, {root:true})
    },

    async addCard(context, payload){
      const deck = context.rootState.decks.decks;

      if(deck.cards_count <= 59){ //Si le deck n'est pas plein (donc n'est pas égal à 60, on met inférieur ou égal à 59 pour plus de sécurité)
        
        //Permet de trouver si l'id de la carte existe dans le deck
        let found = deck.cards.some(ele => ele.card_id === `${payload.card_id}`);
        
        if(found){ //Si la carte est dans le deck alors on modifie la quantité, sinon on l'ajoute
          let card = deck.cards.find(ele => ele.card_id === `${payload.card_id}`); //On cherche la carte dans le deck
          const newQuantity = card.quantity + 1 //On augmente la quantité

          let url_update = `http://pokemontcg-deck-api/card/${card.id}?quantity=${newQuantity}`;

          if(payload.card_type == 'Energy'){ //Si la carte est une énergie, alors on peut en ajouter qu'importe la quantité, sinon on limite à 4 unités
            await axios.put(url_update);

            context.dispatch('decks/findDeck', payload.deck_id, {root:true})
          } else {
            if(card.quantity <= 3){
              await axios.put(url_update);

              context.dispatch('decks/findDeck', payload.deck_id, {root:true})
            }
          }
        } else { 
          let url_post = `http://pokemontcg-deck-api/card?card_id=${payload.card_id}&deck_id=${payload.deck_id}&quantity=1`;
  
          await axios.post(url_post);

          context.dispatch('decks/findDeck', payload.deck_id, {root:true})
        }

      }  
    }
  },

}

export default cards;