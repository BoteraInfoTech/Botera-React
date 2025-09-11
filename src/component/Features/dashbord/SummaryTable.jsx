import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
} from "@mui/material";
import { CheckCircle, AccessTime, Cancel } from "@mui/icons-material";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Anna Jones", status: "Auto-replied" },
  { id: 2, name: "David Smith", status: "Pending" },
  { id: 3, name: "Sarah Johnson", status: "Pending" },
  { id: 4, name: "John Doe", status: "Auto-replied" },
  { id: 5, name: "Emily Davis", status: "Failed" },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Auto-replied":
      return (
        <Chip
          icon={<CheckCircle />}
          label="Auto-replied"
          color="success"
          size="small"
          variant="outlined"
        />
      );
    case "Pending":
      return (
        <Chip
          icon={<AccessTime />}
          label="Pending"
          color="warning"
          size="small"
          variant="outlined"
        />
      );
    case "Failed":
      return (
        <Chip
          icon={<Cancel />}
          label="Failed"
          color="error"
          size="small"
          variant="outlined"
        />
      );
    default:
      return <Chip label={status} size="small" />;
  }
};

export default function SummaryTable({ rows = conversations }) {
  const [filter, setFilter] = useState("All");

  // Filtering
  const filteredRows =
    filter === "All" ? rows : rows.filter((r) => r.status === filter);

  return (
    <TableContainer
      component={Paper}
      className="mt-3 shadow-lg rounded-2xl overflow-hidden"
    >
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Today's Conversations</h2>

        {/* Filter by Status */}
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
          className="bg-white"
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Auto-replied">Auto-replied</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Failed">Failed</MenuItem>
        </Select>
      </div>

      <Table>
        <TableHead>
          <TableRow className="bg-gray-100">
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Status</TableCell>
            <TableCell className="font-bold">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{getStatusBadge(row.status)}</TableCell>
              <TableCell>
                <button className="text-blue-500 hover:underline">View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
