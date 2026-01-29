import React from "react";
import { Box, Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";

function AccountCardSkeleton() {
  return (
    <Grid container alignItems="center" sx={{ mb: 1 }} wrap="nowrap">
      <Grid sx={{ display: { xs: "none", sm: "flex" } }}>
        <Skeleton
          animation={false}
          variant="rectangular"
          width={24}
          height={24}
          className="m-3"
        />
      </Grid>

      <Grid sx={{ flex: 1, minWidth: 0 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: { sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Skeleton
                animation={false}
                variant="rounded"
                width={30}
                height={30}
              />
              <Skeleton animation={false} variant="text" width={180} />
            </Stack>

            <Box
              sx={{
                flex: 1,
                display: { xs: "none", sm: "flex" },
                justifyContent: "center",
              }}
            >
              <Skeleton
                animation={false}
                variant="rounded"
                width={110}
                height={32}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 1,
              }}
            >
              <Skeleton
                animation={false}
                variant="rounded"
                width={46}
                height={28}
              />
              <Skeleton
                animation={false}
                variant="circular"
                width={32}
                height={32}
              />
              <Skeleton
                animation={false}
                variant="circular"
                width={32}
                height={32}
              />
            </Box>

            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
              <Skeleton
                animation={false}
                variant="circular"
                width={32}
                height={32}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default function AccountCardSkeletonList({ count = 6 }) {
  return (
    <Box>
      {Array.from({ length: count }).map((_, idx) => (
        <AccountCardSkeleton key={idx} />
      ))}
    </Box>
  );
}
