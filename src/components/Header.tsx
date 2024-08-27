import { CategoryTop } from "@/components/CategoryTop";
import { Icon } from "@/components/Icon";
import { SearchBar } from "@/components/SearchBar";
import { useAuth } from "@/hooks/useAuth";
import { cartIcon, wishIcon } from "@/shared/icons";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const { session, isLoggedIn, logout } = useAuth();

  const mainNavList = [
    { id: "tops", name: "상의", path: `/category/tops` },
    { id: "pants", name: "하의", path: `/category/pants` },
    { id: "sports-bras", name: "스포츠브라", path: `/category/sports-bras` },
    { id: "new", name: "신제품", path: `/category/new` },
    { id: "best", name: "베스트", path: `/category/best` },
    { id: "brands", name: "브랜드", path: `/category/brands` },
  ];

  return (
    <div aria-label="전체 탐색">
      <div className="bg-white py-2 px-16">
        <nav aria-label="사용자 탐색">
          <ul className=" flex flex-row justify-end items-center space-x-4 text-xs">
            <NavLink to={`/help`}>고객센터</NavLink>
            <span>|</span>
            {isLoggedIn && (
              <>
                <button onClick={() => logout()}>로그아웃</button>
                <span>|</span>

                <span>{session?.user?.user_metadata.name}님</span>
              </>
            )}
            {!isLoggedIn && (
              <>
                <NavLink to={`/signup`}>회원가입</NavLink>
                <span>|</span>
                <NavLink to={`/login`}>로그인</NavLink>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div
        aria-label="검색 탐색"
        className="bg-white y-2 px-16 flex flex-row justify-between items-center text-sm"
      >
        <Link to={`/`} className="text-xl font-semibold w-20">
          F4H
        </Link>
        <search aria-label="검색" className="w-80">
          <SearchBar />
        </search>
        <div className="flex flex-row justify-end space-x-4 w-20">
          <NavLink to={`/wish`}>
            <Icon className="size-6">{wishIcon}</Icon>
          </NavLink>
          <NavLink to={`/cart`}>
            <div className="relative">
              <Icon className="size-6">{cartIcon}</Icon>
              <div className="absolute top-[5px] left-[9px] text-[8px]">
                {"2"}
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      <header className="mt-3 py-2 px-16 text-sm border-t-[1px] border-b-[1px]">
        <nav
          aria-label="메인 탐색"
          className="relative flex flex-row justify-center"
        >
          <div className="absolute left-0">
            <CategoryTop />
          </div>
          <ul className="space-x-4">
            {mainNavList.map((li) => (
              <NavLink
                key={li.id}
                className={({ isActive }) =>
                  `transition duration-200 ease-in-out ${
                    isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                  }`
                }
                to={li.path}
              >
                {li.name}
              </NavLink>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;