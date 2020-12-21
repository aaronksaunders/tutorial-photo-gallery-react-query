//
// firebaseservice - a service for managing the interaction
// with firebase
//
//

// FIREBASE
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

console.log(process.env);
const db = firebase
  .initializeApp({
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  })
  .firestore();

const photoCollection = db.collection("photos");

const API = () => {
  /**
   *
   * @param collection returns data for specified collections
   */
  const getCollectionData = async (collection: any) => {
    const querySnapshot = await collection.get();
    const results = querySnapshot.docs.map((doc: any) => {
      return { ...doc.data(), id: doc.id };
    });
    return results;
  };

  /**
   * get document from firebase and not local photos
   *
   * @param collection
   * @param id
   */
  const getCollectionDoc = async (collection: any, id: string) => {
    const doc = await collection.doc(id).get();
    return { ...doc.data(), id: doc.id };
  };

  /**
   * delete document from firebase collection
   *
   * @param collection
   * @param id
   */
  const removeCollectionDoc = async (collection: any, id: string) => {
    await collection.doc(id).delete();
    return true;
  };

  /**
   *
   * @param collection
   * @param data
   */
  const writeCollectionDoc = async (collection: any, data: any) => {
    await collection.doc().set({ ...data }, { merge: true });
    return true;
  };

  const uploadFile = (data: any, progress: any) => {
    return new Promise<Error | any>((resolve, reject) => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef
        .child(`images/${data.fileName}`)
        .put(data.blob, {
          contentType: data.blob.type,
        });

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        next: (snapshot) => {
          //progress.value = snapshot.bytesTransferred / snapshot.totalBytes;
          progress && progress(snapshot);
        },
        error: (error: firebase.storage.FirebaseStorageError) => {
          reject(error);
        },
        complete: async () => {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          const {
            fullPath,
            name,
            size,
            timeCreated,
          } = await uploadTask.snapshot.ref.getMetadata();
          resolve({
            fullPath,
            name,
            size,
            timeCreated,
            url,
          });
        },
      });
    });
  };

  /**
   *
   * @param data
   */
  const savePhoto = async (data: any, progress: any) => {
    try {
      // save to file storage
      const uploadData = await uploadFile(data, progress);
      // write collection
      await writeCollectionDoc(photoCollection, {
        fileName: data.fileName,
        uploadData,
      });
      return uploadData;
    } catch (e) {
      throw e;
    }
  };

  /**
   *
   * @param id
   * @param path
   */
  const deletePhoto = async (id: string, path: string) => {
    // Create a reference to the file to delete
    const storageRef = firebase.storage().ref();

    // Delete the file
    await storageRef.child(path).delete();
    // Delete the doc from collection
    return await removeCollectionDoc(photoCollection, id);
  };

  return {
    // functions
    deletePhoto,
    savePhoto,
    loadPhotos: async () => {
      return await getCollectionData(photoCollection);
    },
  };
};

export default API();
