
import Image from "next/image";

const TOKEN = "eyJraWQiOiJzcTJOQUdSMUxWMlBGSHJwc0pCNEFZaFhRc3pRWk9tRlNnTTUzVTFTVWlRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxOWE1YjkxZC0xMmQ5LTRhNzEtOWI5Zi1kODU0YmYxYjY4ZGMiLCJhdWQiOiIxNDF2YzF2aGMxdTltcWRwcW4xMTJlamZmMSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjljYmFlYjVjLWM3YTctNGNmOC05YTllLTMwNDAxMGM0NzgxNyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzA0MjkxNDQxLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9zV090RHRQUDYiLCJjb2duaXRvOnVzZXJuYW1lIjoibld3TUNtZ2VWSF8iLCJleHAiOjE3MDQ5MDEyNzYsImlhdCI6MTcwNDg5NzY3NiwiZW1haWwiOiJuV3dNQ21nZVZIX0B1c2Vycy5zdGVwcy5tZSJ9.o2yUsc5FL4XopWCaeAurhYTXcfVVjw5SBlPZ09w-Ml2hfXag5bDvG2MkfAQ1EmIWSiPIxGmWrW7AXlsSTLffCrUE70z6GSx85aPVi5NPtOsrGX9z3L3aBCcJQ6Sf7ueIZPj8dIQmbb_6OYLD1Q8W7t9COerT0N4hmghhrZCDewqnQf5EcPB_BN3ZTLzOXucbFgju6Sf7M0pCd5ysgEnY4pE790kgIWEzvOnP9KeUwawi2Ubmvyf5CHgfblgONOn0sGdmABL5UwfVvfBxU_EELHBakKbwp1yhGxLO1ByHMwpKEe9cRv5ppfNpbefZTete1_1cSeJ110OB-MGPZtcuCw";
const PLACE_PROFILE_URL = 'http://localhost:3000/atly/place-profile';
const PHOTO_BY_REFERENCE_URL = 'https://maps.googleapis.com/maps/api/place/photo';
const GOOGLE_API_KEY = 'AIzaSyAAvPKURW006tRB9dDW1Yjgl-fhS1AaJtI';

const getPlaceProfile = async ({ locationId, mapId }: {
   locationId: string,
   mapId: string,
}) => {
   if (!locationId || !mapId) {
      throw new Error('missing params');
   }
   
   const url = new URL(PLACE_PROFILE_URL);
   url.searchParams.append('location_id', locationId);
   url.searchParams.append('map_id', mapId);
   
   const response = await fetch(url.toString(), {
      headers: {
         app_version: '3.19.1.1719D',
         app_platform: 'map_manager',
         Authorization: TOKEN
      }
   });

   return await response.json();
}
const photoByReference = async (photoReference: string): Promise<ArrayBuffer> => {
   const url = new URL(PHOTO_BY_REFERENCE_URL);
   url.searchParams.append('maxwidth', '400');
   url.searchParams.append('maxheight', '400');
   url.searchParams.append('key', GOOGLE_API_KEY);
   url.searchParams.append('photo_reference', photoReference);
   
   const response = await fetch(url.toString());
   
   return await response.arrayBuffer();
};

const addBinaryData = async (photos: any): Promise<any> => {
   // @ts-ignore
   return await Promise.all(photos.data.map(async (photo) => {
      const arrayBuffer = await photoByReference(photo.photo_reference);
      // @ts-ignore
      const binaryData = Buffer.from(arrayBuffer, 'binary').toString('base64');
      const imageSrc = `data:image/jpeg;base64,${binaryData}`;
      return { 
         ...photo,
         imageSrc
      };
   }));
}

// @ts-ignore
const Images = ({ images }) => {
   return (
      <ul className="flex gap-2">
         {images.map(({photo_reference, imageSrc}) => {
            return (
               <li key={photo_reference}>
                  <span className="flex text-xs overflow-x-scroll w-20">{photo_reference}</span>
                  <Image src={imageSrc} alt={photo_reference} width={100} height={100}/>
               </li>
            );
         })}
      </ul>
   )
}

export default async function Index({searchParams}: any) {
   const locationId = searchParams.location_id;
   const mapId = searchParams.map_id;

   if (!locationId || !mapId) {
      return null;
   }

   const {photos, renewedGooglePhotos} = await getPlaceProfile({
      locationId,
      mapId,
   });

   if (!photos || !photos.data) {
      console.log('no photos');
      return null;
   }
   
   const photosWithBlobs = await addBinaryData(photos);
   const renewedWithBlobs = await addBinaryData(renewedGooglePhotos);
   
   return (
      <div>
         <Images images={photosWithBlobs}/>
         <br/><br/>
         <Images images={renewedWithBlobs}/>
      </div>
   )
};