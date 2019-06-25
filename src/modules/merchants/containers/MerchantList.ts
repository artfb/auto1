import { connect } from "react-redux";
import { loadMerchantsAction } from "../actions";

import TableView from "../components/TableView";
import { MerchantsState } from "../reducer";

const mapStateToProps = (state: MerchantsState) => ({
  loading: state.isLoadingMerchants,
  merchants: state.merchants.result.map(v => state.merchants.entities.merchants[Number(v)])
});

const mapDispatchToProps = {
  load: loadMerchantsAction,
};

export type TableViewComponentProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TableView as any);
