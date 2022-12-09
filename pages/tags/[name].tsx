import TagsLayout from "@/components/tags/layout";
import { useRouter } from "next/router";

export default function TagsPageName() {
  const router = useRouter();
  const { name } = router.query;

  return (
    <TagsLayout>
      <div>{name}</div>
    </TagsLayout>
  );
}
