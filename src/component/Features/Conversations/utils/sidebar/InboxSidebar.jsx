// InboxSidebar.jsx
import React from "react";

import ConversationItem from "./ConversationItem";
import AccountDropdown from "./AccountDropdown";
import CustomSearch from "../../../../commonComponents/filters/CustomSearch";
import BadgeFilter from "../../../../commonComponents/filters/badgeFilter";
import SortMenu from "../../../../commonComponents/filters/SortMenu";

export default function InboxSidebar({
  accounts = [],
  showAccount = false,
  setShowAccount = () => {},
  selectedAccount = "",
  setSelectedAccount = () => {},
  setSearch = () => {},
  search = "",
  showSortMenu = false,
  setShowSortMenu = () => {},
  filter = "All",
  setFilter = () => {},
  filterList = [],
  dateSort = "asc",
  setDateSort = () => {},
  filtered = [],
  openConversation = () => {},
  togglePin = () => {},
  activeConversationId = 1,
}) {
  return (
    <aside className="w-96 bg-white border-r border-neutral-200 shadow-sm flex flex-col">
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Inbox</h2>
        </div>
        <AccountDropdown
          accounts={accounts}
          showAccount={showAccount}
          selectedAccount={selectedAccount}
          setShowAccount={setShowAccount}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
      <div className="px-4 pb-3">
        <div className="flex items-center bg-neutral-100 rounded-full px-3 py-2">
          <CustomSearch search={search} setSearch={setSearch} />
          <SortMenu
            setShowSortMenu={setShowSortMenu}
            showSortMenu={showSortMenu}
            setSortOrder={setDateSort}
            sortOrder={dateSort}
            field="Date"
          />
        </div>
        <BadgeFilter
          filterList={filterList}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((conversation) => (
          <ConversationItem
            key={`conversation_${conversation.id}`}
            conversation={conversation}
            isActive={activeConversationId === conversation.id}
            onTogglePin={() => togglePin(conversation.id)}
            openConversation={() => openConversation(conversation.id)}
          />
        ))}
      </div>
    </aside>
  );
}
