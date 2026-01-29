import React from "react";
import { Box, Skeleton } from "@mui/material";
import AccountCardSkeletonList from "./AccountCardSkeleton";

export default function ManageAccountsSkeleton({ count = 6 }) {
  return (
    <Box>
      {/* Desktop toolbar skeleton (checkbox + search + pagination) */}
      {/* <Box
        sx={{
          mb: 3,
          display: { xs: "none", sm: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Skeleton
            animation={false}
            variant="rectangular"
            width={24}
            height={24}
            sx={{ borderRadius: 1 }}
          />
          <Skeleton
            animation={false}
            variant="rounded"
            width={320}
            height={40}
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Skeleton
            animation={false}
            variant="rounded"
            width={34}
            height={34}
          />
          <Skeleton
            animation={false}
            variant="rounded"
            width={34}
            height={34}
          />
          <Skeleton
            animation={false}
            variant="rounded"
            width={34}
            height={34}
          />
          <Skeleton
            animation={false}
            variant="rounded"
            width={34}
            height={34}
          />
          <Skeleton
            animation={false}
            variant="rounded"
            width={34}
            height={34}
          />
        </Stack>
      </Box> */}

      {/* Mobile toolbar skeleton (button + search) */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          flexDirection: "column",
          m: 2,
          gap: 1,
        }}
      >
        <Skeleton animation={false} variant="rounded" height={40} />
        <Skeleton animation={false} variant="rounded" height={40} />
      </Box>

      {/* Account cards skeleton */}
      <AccountCardSkeletonList count={count} />

      {/* Mobile pagination skeleton */}
      <Box
        sx={{
          mt: 2,
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Skeleton animation={false} variant="rounded" width={34} height={34} />
        <Skeleton animation={false} variant="rounded" width={34} height={34} />
        <Skeleton animation={false} variant="rounded" width={34} height={34} />
        <Skeleton animation={false} variant="rounded" width={34} height={34} />
        <Skeleton animation={false} variant="rounded" width={34} height={34} />
      </Box>
    </Box>
  );
}
