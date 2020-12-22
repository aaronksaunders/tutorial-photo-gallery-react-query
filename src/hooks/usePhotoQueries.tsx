import { useMutation, useQuery, useQueryClient } from "react-query";
import API from "../firebase-service";


export const usePhoto = (photoId: string) => {
  return useQuery(["photos", photoId], async () => {
    console.log("in query " + photoId);
    return await API.loadPhoto(photoId);
  });
};


export const usePhotos = () => {
  const client = useQueryClient();
  return useQuery(
    "photos",
    async () => {
      console.log("in query");
      let photos = await API.loadPhotos();

      // pre load the cache
      photos.forEach((p: any) => {
        client.setQueryData(["photos", p.id], p);
      });

      return photos;
    }
  );
};
export const useAddPhoto = () => {
  const client = useQueryClient();
  return useMutation(
    async (data: any) => {
      console.info("addPhoto", data);
      return await API.savePhoto(data, null);
    },
    {
      onSuccess: () => {
        client.invalidateQueries("photos");
      },
    }
  );
};
export const useDeletePhoto = () => {
  const client = useQueryClient();
  return useMutation(
    async ({ id, path }: { id: string; path: string; }) => {
      console.info("deletePhoto", id, path);
      return await API.deletePhoto(id, path);
    },
    {
      onSuccess: () => {
        client.invalidateQueries("photos");
      },
    }
  );
};
