import { Skeleton } from "@/app/components";
import { Box, Card, Flex } from "@radix-ui/themes";
export default function LoadingIssueDetailPage() {
  return (
    <Box className="gap-3 max-w-xl">
      <Skeleton />
      <Flex gap="2">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
}
