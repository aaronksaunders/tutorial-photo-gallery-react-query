import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
} from "@ionic/react";
import "./Tab1.css";
import { CameraResultType, CameraSource, CameraPhoto } from "@capacitor/core";
import { useCamera } from "@ionic/react-hooks/camera/useCamera";
import { camera } from "ionicons/icons";
import { decode } from "base64-arraybuffer";
import { useHistory } from "react-router";
import { usePhotos, useDeletePhoto, useAddPhoto } from "../hooks/usePhotoQueries";
import { ErrorDisplay } from "../components/ErrorDisplay";

const Tab1: React.FC = () => {
  const { isLoading, data, error } = usePhotos();
  const history = useHistory();

  const {
    isLoading: delLoading,
    error: delError,
    mutate: deletePhotoMutation,
  } = useDeletePhoto();

  const {
    isLoading: addLoading,
    error: addError,
    mutate: addPhotoMutation,
  } = useAddPhoto();

  const { getPhoto } = useCamera();

  /**
   *
   */
  const takePhoto = async () => {
    let cameraPhoto: CameraPhoto | any;
    try {
      cameraPhoto = await getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 100,
      });

      const fileName = new Date().getTime() + ".jpeg";

      const blob = await convertBase64ToBlob(
        cameraPhoto?.base64String,
        cameraPhoto?.format
      );

      addPhotoMutation({ fileName, blob });
      return true;
    } catch (e) {
      console.log(e);
      debugger;
    }
  };

  /**
   *
   * @param base64
   * @param format
   */
  const convertBase64ToBlob = (base64: string | undefined, format: string) =>
    new Promise((resolve, reject) => {
      if (!base64) reject(null);

      const blob = new Blob([new Uint8Array(decode(base64 as string))], {
        type: `image/${format}`,
      });
      resolve(blob);
    });

  // RENDER
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Gallery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonContent fullscreen>
          <ErrorDisplay error={error || addError || delError} />
          <IonLoading
            isOpen={isLoading || addLoading || delLoading}
            message={"Please wait, Loading Photos..."}
          />

          <IonGrid>
            <IonRow>
              {data?.map((photo: any) => (
                <IonCol size="6" key={photo.id}>
                  <IonImg
                    src={photo.uploadData.url}
                    onClick={() =>
                      deletePhotoMutation({
                        id: photo.id!,
                        path: photo.uploadData.fullPath,
                      })
                    }
                  />
                  <IonButton
                    size="small"
                    expand="block"
                    onClick={() => history.push(`/tab1/details/${photo.id}`)}
                  >
                    DETAILS
                  </IonButton>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          {/*  */}
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Tab1);
