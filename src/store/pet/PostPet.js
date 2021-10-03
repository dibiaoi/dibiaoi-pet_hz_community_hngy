import { updatePetInfo, petDelete, postNewPet } from '@/request/api'
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    postPetInfo({ commit }, info) {
      const {
        features_hz,
        name_hz,
        sex_hz,
        race_hz,
        visual_hz,
        birth_hz,
        image,
        id,
        default_image_hz
      } = info
      const image_hz = []

      for (const i of image) {
        image_hz.push(i.id)
      }
      console.log(image_hz)
      return new Promise((resolve, reject) => {
        updatePetInfo(id, {
          name_hz,
          sex_hz,
          race_hz,
          visual_hz,
          birth_hz,
          image_hz,
          features_hz,
          default_image_hz
        }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    deletePet({ commit }, id) {
      console.log(id)
      return new Promise((resolve, reject) => {
        petDelete(id).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    },
    addNewPet({ commit }, info) {
      const {
        features_hz,
        name_hz,
        sex_hz,
        race_hz,
        visual_hz,
        birth_hz,
        image,
        default_image_hz
      } = info

      console.log(features_hz)
      console.log(default_image_hz)
      const image_hz = []
      for (const i of image) {
        image_hz.push(i.id)
      }
      console.log(image_hz)
      return new Promise((resolve, reject) => {
        postNewPet({
          race_hz,
          sex_hz,
          name_hz,
          default_image_hz,
          birth_hz,
          visual_hz,
          features_hz,
          image_hz
        }).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    }
  }
}
