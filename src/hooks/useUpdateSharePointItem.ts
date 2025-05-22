// useUpdateSharePointItem.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

type UpdateParams = {
  listName: string;
  itemId: number;
  values: Record<string, any>;
};

const getRequestDigest = async (): Promise<string> => {
  const res = await fetch("/_api/contextinfo", {
    method: "POST",
    headers: {
      Accept: "application/json;odata=verbose",
    },
  });
  const data = await res.json();
  return data.d.GetContextWebInformation.FormDigestValue;
};

const updateSharePointItem = async ({ listName, itemId, values }: UpdateParams) => {
  const digest = await getRequestDigest();
//   console.log("digest", digest);
    const r = await fetch(`/_api/web/lists/getbytitle('${listName}')/items(${itemId})`, {
  headers: {
    Accept: "application/json;odata=verbose"
  }
});

const data = await r.json();
const etag = `"${data.d.__metadata.etag.replace(/"/g, '')}"`; ;
  const res = await fetch(
    `/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
    {
      method: "PATCH",
      headers: {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "IF-MATCH": "\"b4b68c13-a4ae-4526-98f1-dddd7beae950,1\"",
        "X-RequestDigest": digest,
      },
      body: JSON.stringify({
  Title: "עודכן"
}),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Update failed: ${res.status} - ${err}`);
  }

  return res.json();
};

export const useUpdateSharePointItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSharePointItem,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["sharepointItems"] });
    },
  });
};
