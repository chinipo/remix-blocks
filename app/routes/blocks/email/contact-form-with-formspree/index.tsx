import { useState } from "react";
import { json, LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ButtonPrimary from "~/components/ui/buttons/ButtonPrimary";
import InputText from "~/components/ui/input/InputText";

type LoaderData = {
  title: string;
  actionUrl: string;
};
export let loader: LoaderFunction = async () => {
  const data: LoaderData = {
    title: "Contact form with Formspree | RemixBlocks",
    actionUrl: process.env.INTEGRATIONS_CONTACT_FORMSPREE?.toString() ?? "",
  };
  return json(data);
};

export const meta: MetaFunction = ({ data }) => ({
  title: data?.title,
});

export default function Example() {
  const data = useLoaderData<LoaderData>();
  const [formUrl, setFormUrl] = useState(data.actionUrl);

  return (
    <div className="space-y-3">
      <form action={formUrl} method="POST" className="grid grid-cols-1 gap-x-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
        {/* TODO: DELETE SET UP LINES - START */}
        <InputText
          name="form-url"
          title="Formspree URL (we don't store this)"
          value={formUrl}
          setValue={setFormUrl}
          className="sm:col-span-2"
          required
          autoComplete="off"
          hint={
            <a className="underline text-theme-500 hover:text-theme-600" href="https://formspree.io" target="_blank" rel="noreferrer">
              Get form
            </a>
          }
        />

        {/* TODO: DELETE SET UP LINES - END */}

        <InputText name="first_name" title="First name" required />
        <InputText name="last_name" title="Last name" required />
        <InputText type="email" name="email" title="Email" required className="sm:col-span-2" />
        <InputText name="comments" title="Comments" rows={3} required className="sm:col-span-2" />

        <div className="text-right sm:col-span-2">
          <ButtonPrimary type="submit">Send</ButtonPrimary>
        </div>
      </form>
    </div>
  );
}
