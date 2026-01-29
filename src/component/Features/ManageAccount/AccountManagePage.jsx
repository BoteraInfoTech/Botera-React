import React, { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ConnectAccountModal from "./ConnectAccountModal";
import PageHeader from "../../commonComponents/PageHeader";
import BulkActionBar from "./BulkAction";
import NoAccounts from "./NoAccount";
import NoResults from "./NoResult";
import AccountCard from "./AccountCard";
import AccountMenu from "./AccountMenu";
import MobileHeader from "./MobileHeader";
import AccountListModal from "./container/AccountListModal";
import AlertMessage from "../../commonComponents/AlertMessage";
import ManageAccountsSkeleton from "./loader/ManageAccountsSkeleton";
import AccountCardSkeletonList from "./loader/AccountCardSkeleton";
import ConfirmationModal from "../../commonComponents/ConfirmationModal";
import { BACKEND_POINT } from "../../../utils/config";
import callAPI from "../../../utils/callApi";

function ManageAccounts({ accountReducer = {}, getConnectedAccounts }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [isAllSelectedAcrossPages, setIsAllSelectedAcrossPages] =
    useState(false);
  const [deselectedIds, setDeselectedIds] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [connectOpen, setConnectOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [uiPage, setUiPage] = useState(1);
  const [isSnykLoading, setIsSnykLoading] = useState("");
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [bulkDeleteError, setBulkDeleteError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    accounts = [],
    isLoadingAccounts,
    totalPage = 1,
    currentPage = 1,
    totalAccounts = 0,
  } = accountReducer;

  const accountsData = accounts;

  const location = useLocation();

  // Fetch accounts on initial mount (no search)
  useEffect(() => {
    setUiPage(1);
    getConnectedAccounts({ page: 1, q: "" });
  }, [getConnectedAccounts]);

  const query = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  useEffect(() => {
    if (query.get("code")) {
      setCode(query.get("code"));
    }
  }, [query]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const reason = params.get("error_reason");
    if (error === "access_denied" && reason === "user_denied") {
      setError("Connection cancelled. Required permissions were not granted.");
      navigate("/account", { replace: true });
      return;
    }
  }, [location.search, navigate]);

  const platformId = query.get("id");
  const isReconnect = query.get("reconnect");

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (code && platformId && !openModal) {
      setOpenModal(true);
      window.history.replaceState({}, document.title, "/account");
    }
  }, [code, platformId, openModal]);

  const filtered = accountsData;

  const sanitizeQuery = (value) => value.replace(/[<>]/g, "").slice(0, 100);

  const handleSearchChange = (value) => {
    const sanitized = sanitizeQuery(value);
    setSearchInput(sanitized);
  };

  // Debounced search - calls API with q param
  useEffect(() => {
    const trimmed = searchInput.trim();

    // Avoid duplicate calls when nothing changed
    if (trimmed === searchQuery) return;

    if (totalAccounts === 0) {
      return;
    }
    const handler = setTimeout(() => {
      setSearchQuery(trimmed);
      setUiPage(1);
      getConnectedAccounts({ page: 1, q: trimmed });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput, searchQuery, getConnectedAccounts, totalAccounts]);
  const isAccountSelected = (id) => {
    if (isAllSelectedAcrossPages) {
      return !deselectedIds.includes(id);
    }
    return selected.includes(id);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      // Select all accounts across all pages
      setIsAllSelectedAcrossPages(true);
      setSelected([]);
      setDeselectedIds([]);
    } else {
      // Clear all selections
      setIsAllSelectedAcrossPages(false);
      setSelected([]);
      setDeselectedIds([]);
    }
  };

  const handleSelect = (id) => {
    if (isAllSelectedAcrossPages) {
      // In "select all" mode, track exceptions
      setDeselectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    } else {
      // Normal per-id selection
      setSelected((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );
    }
  };

  const handlePageChange = (page) => {
    setUiPage(page); // optimistic: update selected page immediately
    getConnectedAccounts({ page, q: searchQuery });
  };

  useEffect(() => {
    // Once API resolves, keep UI page in sync with backend.
    setUiPage(currentPage);
  }, [currentPage]);

  const selectedCount = isAllSelectedAcrossPages
    ? Math.max(totalAccounts - deselectedIds.length, 0)
    : selected.length;

  const allSelectedGlobally =
    totalAccounts > 0 && selectedCount === totalAccounts;

  const selectedIdsOnPage = filtered
    .filter((acc) => isAccountSelected(acc.id))
    .map((acc) => acc.id);

  const handleBulkDeleteConfirm = async () => {
    if (selectedCount === 0 || isBulkDeleting) return;

    setIsBulkDeleting(true);
    setBulkDeleteError("");
    try {
      if (isAllSelectedAcrossPages) {
        await callAPI(
          `${BACKEND_POINT}/account/delete/1?deleteAll=true`,
          "DELETE",
        );
      } else {
        await callAPI(`${BACKEND_POINT}/account/delete/1`, "DELETE", {
          accountIds: selected,
        });
      }
      // Close modal and reset state
      setIsBulkDeleteOpen(false);
      setIsBulkDeleting(false);
      setBulkDeleteError("");
      // Clear selections
      setSelected([]);
      setDeselectedIds([]);
      setIsAllSelectedAcrossPages(false);
      // Show success toast before refreshing list
      setSuccessMessage("Selected accounts deleted");
      // Refresh list after successful delete
      getConnectedAccounts({ page: uiPage, q: searchQuery });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to delete selected accounts";
      setBulkDeleteError(message);
      setIsBulkDeleting(false);
    }
  };

  return (
    <div className="md:ml-0 ml-14">
      {error && <AlertMessage message={error} type="error" />}
      {successMessage && (
        <AlertMessage
          message={successMessage}
          type="success"
          onCloseComplete={() => setSuccessMessage("")}
        />
      )}

      {/* Bulk Delete Confirmation Modal */}
      <ConfirmationModal
        open={isBulkDeleteOpen}
        onClose={() => {
          if (!isBulkDeleting) {
            setIsBulkDeleteOpen(false);
            setBulkDeleteError("");
          }
        }}
        title="Delete selected accounts?"
        description={
          isAllSelectedAcrossPages
            ? `This will permanently remove all ${selectedCount} selected account${selectedCount !== 1 ? "s" : ""} from Botera.`
            : `This will permanently remove ${selectedCount} selected account${selectedCount !== 1 ? "s" : ""} from Botera.`
        }
        confirmText={isBulkDeleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={handleBulkDeleteConfirm}
        isLoading={isBulkDeleting}
        tone="danger"
      >
        {bulkDeleteError ? (
          <Box
            sx={{
              mt: 0.5,
              p: 1.25,
              borderRadius: 2,
              bgcolor: "rgba(211, 47, 47, 0.08)",
              border: "1px solid rgba(211, 47, 47, 0.18)",
            }}
          >
            <Typography variant="body2" color="error.main" fontWeight={600}>
              {bulkDeleteError}
            </Typography>
          </Box>
        ) : null}
      </ConfirmationModal>

      {openModal && (
        <AccountListModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          onSuccess={(message) => {
            setSuccessMessage(message || "Accounts connected successfully");
          }}
          platformId={platformId}
          code={code}
          setCode={setCode}
          isReconnect={isReconnect}
        />
      )}
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

        <BulkActionBar
          search={searchInput}
          setSearch={handleSearchChange}
          allSelected={allSelectedGlobally}
          selectedCount={selectedCount}
          onSelectAll={handleSelectAll}
          onClearSelected={() => {
            setSelected([]);
            setDeselectedIds([]);
            setIsAllSelectedAcrossPages(false);
          }}
          onBulkDelete={() => setIsBulkDeleteOpen(true)}
          totalPage={totalPage}
          currentPage={uiPage}
          totalAccounts={totalAccounts}
          isLoading={isLoadingAccounts}
          onPageChange={handlePageChange}
        />

        {accountsData.length > 0 && (
          <MobileHeader
            search={searchInput}
            setSearch={handleSearchChange}
            setConnectOpen={setConnectOpen}
          />
        )}

        {/* Accounts List */}
        <Box>
          {isLoadingAccounts && accountsData.length === 0 ? (
            <ManageAccountsSkeleton count={6} />
          ) : isLoadingAccounts ? (
            // Show loader when refreshing list (including after delete)
            <AccountCardSkeletonList count={6} />
          ) : accountsData.length === 0 ? (
            searchQuery ? (
              <NoResults
                onClearSearch={() => {
                  setSearchInput("");
                  setSearchQuery("");
                  setUiPage(1);
                  getConnectedAccounts({ page: 1, q: "" });
                }}
              />
            ) : (
              <NoAccounts onConnectClick={() => setConnectOpen(true)} />
            )
          ) : (
            filtered.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                selected={selectedIdsOnPage}
                onSelect={handleSelect}
                onMenuOpen={(e, acc) => {
                  setMenuAnchor(e.currentTarget);
                  setCurrentAccount(acc);
                }}
                isSnykLoading={isSnykLoading}
                setIsSnykLoading={setIsSnykLoading}
                onDeleted={(message) => {
                  // Show success toast before refreshing list (single delete)
                  setSuccessMessage(message || "Account deleted successfully");
                  // Refresh list after successful delete (keep current page + search)
                  getConnectedAccounts({ page: uiPage, q: searchQuery });
                }}
              />
            ))
          )}

          {/* Mobile Pagination */}
          {filtered.length > 0 && totalPage > 1 && (
            <Box
              sx={{
                mt: 2,
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
              }}
            >
              <Pagination
                count={totalPage}
                page={uiPage}
                onChange={(_, page) => handlePageChange(page)}
                disabled={isLoadingAccounts}
                color="primary"
                shape="rounded"
              />
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

export default ManageAccounts;
