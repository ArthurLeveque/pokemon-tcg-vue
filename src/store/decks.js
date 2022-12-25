import axios from 'axios'
import router from '../router'

const decks = {
  namespaced: true,

  state(){
    return {
      decks: {},
      loadingDecks: false,
      emojis: [
        '🃏', '🥵', '😂', '🌿', '🔥', '🐉', '💧', '💨', '⚡', '👊'
      ]
    }
  },

  mutations:{
    UPDATE_DECKS(state, payload){
      state.decks = payload
    },
    UPDATE_LOADING_DECKS_STATE(state, payload) {
      state.loadingDecks = payload
    },
    UPDATE_DECK_IMAGE(state, payload) {
      state.decks.image = payload
    },
    UPDATE_DECK_NAME(state, payload) {
      state.decks.name = payload
    }
  },

  getters: {
    myDeck(state) {
      return state.decks
    }
  },

  actions:{
    async getDecks(context){
      context.commit('UPDATE_LOADING_DECKS_STATE', true);

      const url = `http://pokemontcg-deck-api/deck`;

      const response = await axios.get(url);

      context.commit('UPDATE_DECKS', response.data);

      context.commit('UPDATE_LOADING_DECKS_STATE', false);
    },

    async findDeck(context, id) {
      const url = `http://pokemontcg-deck-api/deck/${id}`;
      //On envoie la requête
      const response = await axios.get(url);
      //On stock le deck
      context.commit('UPDATE_DECKS', response.data);
      //On récupère le deck
      const deck = context.getters.myDeck
      //On envoie le deck dans le module cards pour récupérer les données des cartes dans le deck
      context.dispatch('cards/getCardsFromDeck', deck, {root:true})
    },

    async nameModified(context, payload){
      const deck = context.getters.myDeck;
      const url = `http://pokemontcg-deck-api/deck/${deck.id}?name=${payload.target.value}`;

      await axios.put(url);

      context.commit('UPDATE_DECK_NAME', payload.target.value);
    },

    async imageModified(context, emoji){
      const deck = context.getters.myDeck;
      const url = `http://pokemontcg-deck-api/deck/${deck.id}?image=${emoji}`;

      await axios.put(url);

      context.commit('UPDATE_DECK_IMAGE', emoji);
    },

    async deleteDeck(context){
      const deck = context.getters.myDeck;
      const url = `http://pokemontcg-deck-api/deck/${deck.id}`;

      await axios.delete(url);

      router.push('/my-decks');
    },

    async createDeck(context){
      const url = `http://pokemontcg-deck-api/deck?name=New deck`;

      const response = await axios.post(url);
      //On apelle le deck crée directement pour éviter les bugs quand on appuie sur le bouton "create deck" sur une page d'édition
      context.dispatch('findDeck', response.data);
      //On envoie directement sur la page d'édition du deck fraîchement crée
      router.push(`/my-decks/${response.data}/edit`);
    }
  },

}

export default decks;