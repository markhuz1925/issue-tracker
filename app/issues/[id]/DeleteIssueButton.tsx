import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="red">
      <Link href={`/issues/${issueId}/delete`}>Delete Issue</Link>
    </Button>
  );
}
