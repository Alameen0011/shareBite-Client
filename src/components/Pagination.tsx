import { Button } from "@/components/ui/button";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Create page numbers to show in the pagination
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (  
    <div className="mt-6 flex justify-center gap-2">
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
};

export default Pagination;