import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface MyDropdownProps {
  name: string;
}

const MyDropdown = ({ name }: MyDropdownProps) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="사용자 닉네임">
        {name} 님
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => navigate("/my")}>
          내 정보
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/my/orders")}>
          주문내역
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/my/wish")}>
          위시리스트
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyDropdown;
