export default{
    state:{
        menucols : 3,
        contentcols : 9,
        draggable : false,
        visible : true,
    },
    actions:{
        setMenuCols({commit},menucols){
            commit('setContentCols',12-menucols);
            commit('setMenuCols',menucols)
        },
        setContentCols({commit},menucols){
            commit('setContentCols',menucols);
            commit('setMenuCols',12-menucols)
        },
        setDraggable({commit},draggables){
            commit('setDraggable',draggables);
        },  
        setMenuVisible({commit, dispatch}, visible) {
            if (!visible) {
              dispatch('setContentCols', 12);
            }
            commit('setVisible', visible);
          }
    },
    mutations:{
        setMenuCols(state,menucols){
            state.menucols=menucols
        },
        setContentCols(state,contentcols){
            state.contentcols=contentcols
        },
        setDraggable(state,draggables){
            state.draggable=draggables
        },
        setVisible(state,visible){
            state.visible=visible
        }
    },
    getters:{
        getMenuCols: state => {return state.menucols},
        getContentCols: state => {return state.contentcols},
        getDraggable: state => {return state.draggable},
        getMenuVisible: state => {return state.visible}
    }
}