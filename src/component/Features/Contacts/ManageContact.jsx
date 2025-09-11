import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PageHeader from "../../commonComponents/PageHeader";
import SearchField from "../../commonComponents/Search";

const initialContacts = [
  {
    id: 1,
    name: "Idan Cohen",
    mobile: "123-456-7890",
    email: "idan.cohen",
    status: "Active",
  },
  {
    id: 2,
    name: "Maria Johnson",
    mobile: "234-567-8901",
    email: "maria.johnson",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Noah Miller",
    mobile: "345-678-9012",
    email: "noah.miller",
    status: "Active",
  },
  {
    id: 4,
    name: "Ollvia Brown",
    mobile: "456-789-0123",
    email: "ollvia.brown",
    status: "Active",
  },
  {
    id: 5,
    name: "Emma Taylor",
    mobile: "567-890-1234",
    email: "emma.taylor",
    status: "Inactive",
  },
];

export default function ManageContacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");

  const filtered = contacts.filter(
    (c) =>
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search)
  );

  return (
    <div className="p-6">
      <PageHeader
        title={"Manage Contacts"}
        showButton
        buttonProps={{
          text: "Add Contact",
          onClick: () => {},
        }}
      />

      <Card className="shadow-md">
        <CardContent>
          {/* Search */}
          <SearchField
            placeholder="Search by email"
            search={search}
            setSearch={setSearch}
          />

          {/* Table */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Social Handles</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.mobile}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>
                      <div className="flex gap-2 text-gray-500">
                        <InstagramIcon />
                        <LinkedInIcon />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          c.status === "Active"
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {c.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Edit fontSize="small" />
                      </IconButton>
                      <IconButton color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <Typography variant="body2">1–5 of {contacts.length}</Typography>
            <div className="flex items-center gap-4">
              <Select value={5} size="small">
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
              <Pagination count={5} size="small" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
