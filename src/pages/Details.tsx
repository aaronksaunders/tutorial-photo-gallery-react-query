import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonPage,
  IonToolbar,
  IonTitle,
  IonContent,
  IonImg,
  IonLoading,
  IonText,
} from "@ionic/react";
import { useParams } from "react-router";
import { usePhoto } from "../hooks/usePhotoQueries";
import { ErrorDisplay } from "../components/ErrorDisplay";

const Details: React.FC = () => {
  const { photoId } = useParams<{ photoId: string }>();

  const { isLoading, data, error } = usePhoto(photoId);

  if (isLoading) {
    return (
      <IonLoading isOpen={true} message={"Please wait, Loading Photos..."} />
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
          <IonTitle>Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <ErrorDisplay error={error} />
        {/* <p>{JSON.stringify(data)}</p> */}
        <IonImg src={data.uploadData.url} />
        <IonText>
          <h2>Path:&nbsp;{data.uploadData.fullPath}</h2>
          <h5>Size:&nbsp;{data.uploadData.size}</h5>
          <h5>Created:&nbsp;{data.uploadData.timeCreated}</h5>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Details);
