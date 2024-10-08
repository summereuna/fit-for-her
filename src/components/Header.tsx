import CartDrawer from "@/components/Cart/CartDrawer";
import CategoryTop from "@/components/Category/CategoryTop";
import { Icon } from "@/components/Icon";
import MyDropdown from "@/components/MyDropdown";
import SearchBar from "@/components/SearchBar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { wishIcon } from "@/shared/icons";
import { Link, NavLink } from "react-router-dom";

function Header() {
  const { session, isLoggedIn, logout, userRole } = useAuth();
  const { cartItems } = useCart();
  const totalCountCartItems = cartItems.reduce(
    (total, item) => total + item.size_quantity,
    0
  );

  const mainNavList = [
    { id: "new", name: "신제품", path: `/category/new` },
    { id: "tops", name: "상의", path: `/category/tops` },
    { id: "sports-bras", name: "스포츠브라", path: `/category/sports-bras` },
    { id: "pants", name: "하의", path: `/category/pants` },
    // { id: "best", name: "베스트", path: `/category/best` },
    // { id: "brands", name: "브랜드", path: `/category/brands` },
  ];

  return (
    <div aria-label="전체 탐색">
      <div className="bg-white py-2 px-5 md:px-16">
        <nav aria-label="사용자 탐색">
          <ul className=" flex flex-row justify-end items-center space-x-4 text-xs">
            {/* <NavLink to={`/help`}>고객센터</NavLink> */}
            {/* <Separator orientation="vertical" className="h-3 bg-primary" /> */}
            {isLoggedIn && (
              <>
                <li>
                  <button aria-label="로그아웃 버튼" onClick={() => logout()}>
                    로그아웃
                  </button>
                </li>
                <li aria-hidden="true">
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-primary"
                  />
                </li>
                {userRole === "seller" && (
                  <li>
                    <span aria-label="사용자 닉네임">
                      {session?.user?.user_metadata.name}님
                    </span>
                  </li>
                )}
                {userRole !== "seller" && (
                  <li>
                    <MyDropdown name={session?.user?.user_metadata.name} />
                  </li>
                )}
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <NavLink aria-label="회원가입 페이지로 이동" to={`/signup`}>
                    회원가입
                  </NavLink>
                </li>
                <li aria-hidden="true">
                  <Separator
                    orientation="vertical"
                    className="h-3 bg-primary"
                  />
                </li>
                <li>
                  <NavLink aria-label="로그인 페이지로 이동" to={`/login`}>
                    로그인
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div
        aria-label="검색 탐색"
        className="bg-white y-2 px-5 md:px-16 flex flex-row justify-between items-center text-sm"
      >
        <Link
          to={`/`}
          aria-label="홈 버튼"
          className="text-xl font-semibold w-20"
        >
          F4H
        </Link>
        <search aria-label="검색" className="w-80">
          <SearchBar />
        </search>
        <div className="flex flex-row justify-end space-x-4 w-20">
          <NavLink to={`/my/wish`} aria-label="위시페이지로 이동">
            <Icon className="size-6">{wishIcon}</Icon>
          </NavLink>
          <div className="relative">
            {/*  */}

            <CartDrawer isInNav={true} />
            {/*  */}
            {cartItems.length > 0 && (
              <div className="absolute top-0 right-[-7px] text-[8px] text-white bg-black size-4 rounded-full flex justify-center items-center">
                {totalCountCartItems}
              </div>
            )}
          </div>
        </div>
      </div>
      <header className="mt-3 py-2 px-5 md:px-16 text-sm border-t-[1px] border-b-[1px]">
        <nav
          aria-label="메인 탐색"
          className="relative flex flex-row justify-center"
        >
          <div className="absolute left-0">
            <CategoryTop />
          </div>
          <ul className="space-x-4">
            {mainNavList.map((li) => (
              <li key={li.id} className="inline-block">
                <NavLink
                  className={({ isActive }) =>
                    `transition duration-200 ease-in-out ${
                      isActive ? "pb-[2px] border-b-[1.5px] border-black" : ""
                    }`
                  }
                  to={li.path}
                  aria-label={`${li.name} 카테고리로 이동`}
                >
                  {li.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
