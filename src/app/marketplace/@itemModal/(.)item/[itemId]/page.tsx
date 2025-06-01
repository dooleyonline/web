import ItemModal from "./item-modal";

const ItemModalPage = async ({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) => {
  const { itemId } = await params;

  return <ItemModal itemId={itemId} />;
};

export default ItemModalPage;
