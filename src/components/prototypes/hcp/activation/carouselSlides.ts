export type CarouselSlide = {
  id: number;
  image: string;
  line1: string;
  line2: string;
};

export const carouselSlides: CarouselSlide[] = [
  {
    id: 0,
    image: "/images/hcp/carousel-1.png",
    line1: "Control team spending",
    line2: "with expense cards",
  },
  {
    id: 1,
    image: "/images/hcp/carousel-2.png",
    line1: "Manage transactions",
    line2: "effortlessly",
  },
  {
    id: 2,
    image: "/images/hcp/carousel-3.png",
    line1: "Reconcile faster with",
    line2: "QuickBooks Online",
  },
  {
    id: 3,
    image: "/images/hcp/carousel-4.png",
    line1: "Automatically capture",
    line2: "every receipt",
  },
];
