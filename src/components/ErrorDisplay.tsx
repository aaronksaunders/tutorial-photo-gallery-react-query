import React from "react";
import { IonLabel } from "@ionic/react";

export const ErrorDisplay: React.FC<{ error: any }> = ({ error }) => {
  if (!error) return null;
  return (
    <>
      <div className="ion-padding">
        <IonLabel>{(error as any)?.message}</IonLabel>
      </div>
    </>
  );
};
