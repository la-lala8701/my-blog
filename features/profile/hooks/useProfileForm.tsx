import { ProfileData } from "@/app/types";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { updateProfileById } from "@/lib/supabaseFunctions";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

export const useProfileForm = (props: { id: string }) => {
  const supabase = createBrowserSupabase();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      // データを更新
      await updateProfileById(
        supabase,
        props.id,
        data.display_name,
        data.description,
      );
      router.refresh();
    } catch (error) {
      console.error('予期せぬエラー', error);
    }
  };

  return { handleSubmit, register, errors, onSubmit };
};
