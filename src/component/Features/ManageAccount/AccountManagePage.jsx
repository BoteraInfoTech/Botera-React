import React, { useState } from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ConnectAccountModal from "./ConnectAccountModal";
import PageHeader from "../../commonComponents/PageHeader";
import BulkActionBar from "./BulkAction";
import NoAccounts from "./NoAccount";
import NoResults from "./NoResult";
import AccountCard from "./AccountCard";
import AccountMenu from "./AccountMenu";
import MobileHeader from "./MobileHeader";

const accountsData = [
  {
    id: 1,
    name: "maggzhoward",
    logo: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
    status: "healthy",
    autoReply: true,
  },
  {
    id: 2,
    name: "JohnDoeYT",
    logo: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    status: "reconnect",
    autoReply: false,
  },
  {
    id: 3,
    name: "JaneSmithFB",
    logo: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
    status: "error",
    autoReply: true,
  },
  {
    id: 4,
    name: "TechGuru",
    logo: "https://cdn-icons-png.flaticon.com/512/2111/2111589.png",
    status: "healthy",
    autoReply: false,
  },
];

export default function ManageAccounts() {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connectOpen, setConnectOpen] = useState(false);

  const filtered = accountsData.filter((acc) =>
    acc.name.toLowerCase().includes(search.toLowerCase())
  );

  const allSelected =
    selected.length === filtered.length && filtered.length > 0;

  const handleSelectAll = (checked) => {
    setSelected(checked ? filtered.map((acc) => acc.id) : []);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="md:ml-0 ml-14">
      <ConnectAccountModal
        open={connectOpen}
        onClose={() => setConnectOpen(false)}
      />
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          background: "linear-gradient(135deg, #f9fafb, #f1f5f9)",
          minHeight: "100vh",
        }}
      >
        {/* Header */}
        <PageHeader
          title="Manage Accounts"
          showButton={true}
          buttonProps={{
            text: "Connect Account",
            onClick: () => setConnectOpen(true),
          }}
        />
        {/* Bulk Action Bar */}
        {accountsData.length > 0 && (
          <BulkActionBar
            search={search}
            setSearch={setSearch}
            selected={selected}
            filtered={filtered}
            allSelected={allSelected}
            onSelectAll={handleSelectAll}
            onClearSelected={() => setSelected([])}
          />
        )}

        {accountsData.length > 0 && (
          <MobileHeader
            search={search}
            setSearch={setSearch}
            setConnectOpen={setConnectOpen}
          />
        )}

        {/* Accounts List */}
        <Box>
          {accountsData.length === 0 ? (
            <NoAccounts onConnectClick={() => setConnectOpen(true)} />
          ) : filtered.length === 0 ? (
            <NoResults onClearSearch={() => setSearch("")} />
          ) : (
            filtered.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                selected={selected}
                onSelect={handleSelect}
                onMenuOpen={(e, acc) => {
                  setMenuAnchor(e.currentTarget);
                  setCurrentAccount(acc);
                }}
              />
            ))
          )}

          {/* Mobile Pagination */}
          {filtered.length > 0 && (
            <Box
              sx={{
                mt: 2,
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
              }}
            >
              <Pagination count={3} color="primary" shape="rounded" />
            </Box>
          )}
        </Box>

        {/* Mobile Menu */}
        <AccountMenu
          anchorEl={menuAnchor}
          account={currentAccount}
          onClose={() => {
            setMenuAnchor(null);
            setCurrentAccount(null);
          }}
        />
      </Box>
    </div>
  );
}
