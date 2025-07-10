import { useFieldArray, useForm } from "react-hook-form"
import { MdPrint } from "react-icons/md";
import { useParams } from "react-router-dom"


const AddProduct = () => {

  const {id} = useParams();

const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      salesOrderNo: "SO-000032",
      date: "",
      agentName: "",
      businessPartner: "",
      contactPerson: "Mr. Lim",
      contactPhone: "+6012345678",
      contactAddress:
        "No 1, Jalan TK 5/44, Kinrara Industrial Park,\nJalan Puchong,\n47100 Puchong,\nSelangor, Malaysia.",
      creditTerm: "SO-000032",
      creditLimit: "SO-000032",
      remark: "",
      items: [
        {
          no: 1,
          productCode: "",
          description: "",
          qty: "",
          uom: "",
          unitPrice: "",
          price: "",
        },
      ],
      promotion: "",
      gstRate: 6,
    },
  })


  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const watchedItems = watch("items")
  const watchedPromotion = watch("promotion")

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = watchedItems.reduce((sum, item) => {
      const price = Number.parseFloat(item.price) || 0
      return sum + price
    }, 0)

    const totalQty = watchedItems.reduce((sum, item) => {
      const qty = Number.parseFloat(item.qty) || 0
      return sum + qty
    }, 0)

    const promotion = Number.parseFloat(watchedPromotion) || 0
    const subtotalAfterPromotion = subtotal - promotion
    const gst = subtotalAfterPromotion * 0.06
    const total = subtotalAfterPromotion + gst

    return {
      totalQty,
      subtotal,
      promotion,
      gst,
      total,
    }
  }

  const totals = calculateTotals()

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    alert("Form submitted successfully!")
  }

  const addNewItem = () => {
    append({
      no: fields.length + 1,
      productCode: "",
      description: "",
      qty: "",
      uom: "",
      unitPrice: "",
      price: "",
    })
  }

  return (
    <section>
      <div className="capitalize">
         <div className="py-3 bg-[#F04E24] ps-5">
         <div className="">

            {id ? (
              <>
               <div className="w-full flex items-center justify-between pe-5">
                <div className="flex items-center gap-5">
                   <span className="text-[#010101] font-medium">Approval Sales Order</span>
                <span className="bg-[#FFE3B8] rounded-sm py-[2px] px-[16px] cursor-pointer font-medium hover:bg-[#e9ba73]">Pending</span>
                </div>
                  <div className="flex items-center gap-2 font-medium cursor-pointer text-white">
                    <MdPrint size={24} className="bg-[#F04E24] " />Print
                    
                  </div>

               </div>

              </>
            ) : (
              <>
                <div className="flex items-center gap-5">
                      <span className="text-[#010101] font-medium">Add new sales order</span>
                <span className="bg-[#FFE3B8] rounded-sm py-[2px] px-[16px] cursor-pointer font-medium hover:bg-[#e9ba73]">New Order</span>
                </div>
              </>
            )}
    </div>
         </div>


            <div className="bg-white flex items-center  gap-5 pt-10 justify-end pe-5">

                   <span className="bg-[#FF9900] rounded-sm py-[4px] px-[20px] cursor-pointer  hover:bg-[#d1902f] text-white">Reject</span>
                    <span className="bg-[#23DA52] rounded-sm py-[4px] px-[20px] cursor-pointer  hover:bg-[#2fc053] text-white">Approve</span>
 
          </div>

          <div className="bg-white pt-10 p-8">
        <form onSubmit={handleSubmit(onSubmit)} >
          {/* Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-[#DE472D] mb-1">Sales Order No</label>
              <input {...register("salesOrderNo")} 
              className="input input-bordered w-full bg-gray-100"
              type="number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#DE472D] mb-1">Date</label>
              <div className="relative">
                <input {...register("date")} type="date" className="input input-bordered w-full" />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#DE472D] mb-1">Agent Name</label>
              <select {...register("agentName")} className="select select-bordered w-full">
                <option value="">Select Agent</option>
                <option value="agent1">Agent 1</option>
                <option value="agent2">Agent 2</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#DE472D] mb-1">Business Partner</label>
              <select {...register("businessPartner")} className="select select-bordered w-full">
                <option value="">Select Partner</option>
                <option value="partner1">Partner 1</option>
                <option value="partner2">Partner 2</option>
              </select>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="flex gap-6 mb-6">

            <div className="bg-gray-100 p-4 rounded-lg basis-6/12">
              <h3 className="text-sm font-medium text-[#DE472D] mb-3">Contact Person & Address</h3>
              <div className="space-y-2">
                <input
                  {...register("contactPerson")}
                  className="input input-bordered w-full text-sm"
                  placeholder="Contact Person"
                />
                <input
                  {...register("contactPhone")}
                  className="input input-bordered w-full text-sm"
                  placeholder="Phone Number"
                />
                <textarea
                  {...register("contactAddress")}
                  className="textarea textarea-bordered w-full text-sm"
                  rows="4"
                  placeholder="Address"
                />
              </div>
            </div>

            <div className="basis-6/12">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-full">
                    <label className="text-[#DE472D] text-sm font-medium">Credit Term</label>
                   <input
                  {...register("credit_term")}
                  className="input input-bordered w-full text-sm"
                  placeholder="Contact Person"
                />
                  </div>

                  <div className="w-full">
                    <label className="text-[#DE472D] text-sm font-medium">Credit Term</label>
                   <input
                  {...register("credit_term")}
                  className="input input-bordered w-full text-sm"
                  placeholder="Contact Person"
                />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="text-[#DE472D] text-sm font-medium">Remark</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Type your message here..."
                ></textarea>
                </div>
            </div>

          

          </div>

        

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Items</h3>
              <button
                type="button"
                onClick={addNewItem}
                className="btn btn-outline btn-sm text-[#DE472D] border-orange-600 hover:bg-orange-600 hover:text-white"
              >
                + Add New
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-[#F04E24] text-white">
                  <tr>
                    <th className="text-white">No</th>
                    <th className="text-white">Product Code</th>
                    <th className="text-white">Description</th>
                    <th className="text-white">Qty</th>
                    <th className="text-white">UOM</th>
                    <th className="text-white">Unit Price</th>
                    <th className="text-white">Price</th>
                    <th className="text-white">Action</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {fields.map((field, index) => (
                    <tr key={field.id} className="">
                      <td>{index + 1}</td>
                      <td>
                        <input
                          {...register(`items.${index}.productCode`)}
                          className="input input-bordered input-sm w-full"
                          placeholder="Product Code"
                        />
                      </td>
                      <td>
                        <input
                          {...register(`items.${index}.description`)}
                          className="input input-bordered input-sm w-full"
                          placeholder="Description"
                        />
                      </td>
                      <td>
                        <input
                          {...register(`items.${index}.qty`)}
                          type="number"
                          className="input input-bordered input-sm w-full"
                          placeholder="Qty"
                          onChange={(e) => {
                            const qty = Number.parseFloat(e.target.value) || 0
                            const unitPrice = Number.parseFloat(watch(`items.${index}.unitPrice`)) || 0
                            setValue(`items.${index}.price`, (qty * unitPrice).toFixed(2))
                          }}
                        />
                      </td>
                      <td>
                        <select {...register(`items.${index}.uom`)} className="select select-bordered select-sm w-full">
                          <option value="">UOM</option>
                          <option value="pcs">PCS</option>
                          <option value="kg">KG</option>
                          <option value="box">BOX</option>
                        </select>
                      </td>
                      <td>
                        <input
                          {...register(`items.${index}.unitPrice`)}
                          type="number"
                          step="0.01"
                          className="input input-bordered input-sm w-full"
                          placeholder="Unit Price"
                          onChange={(e) => {
                            const unitPrice = Number.parseFloat(e.target.value) || 0
                            const qty = Number.parseFloat(watch(`items.${index}.qty`)) || 0
                            setValue(`items.${index}.price`, (qty * unitPrice).toFixed(2))
                          }}
                        />
                      </td>
                      <td>
                        <input
                          {...register(`items.${index}.price`)}
                          type="number"
                          step="0.01"
                          className="input input-bordered input-sm w-full"
                          placeholder="Price"
                          readOnly
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="btn btn-error btn-sm text-white"
                          disabled={fields.length === 1}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="block text-sm font-medium text-[#DE472D] mb-1">Promotion</label>
              <input
                {...register("promotion")}
                type="number"
                step="0.01"
                className="input input-bordered w-full"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Qty</span>
                <span className="font-semibold">{totals.totalQty.toFixed(0)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Sub Total (Excluding GST)</span>
                <input
                  type="number"
                  value={totals.subtotal.toFixed(2)}
                  className="input input-bordered input-sm w-32 text-right"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Promotion</span>
                <input
                  type="number"
                  value={totals.promotion.toFixed(2)}
                  className="input input-bordered input-sm w-32 text-right"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  GST payable @6% on {(totals.subtotal - totals.promotion).toFixed(2)}
                </span>
                <input
                  type="number"
                  value={totals.gst.toFixed(2)}
                  className="input input-bordered input-sm w-32 text-right"
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center border-t pt-2">
                <span className="text-sm font-bold">Total (Inclusive GST)</span>
                <input
                  type="number"
                  value={totals.total.toFixed(2)}
                  className="input input-bordered input-sm w-32 text-right font-bold"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between space-x-4">
            <div>
              <button className="bg-[#F04E24] py-2 px-[20px] text-white font-medium">
                Combine Order
              </button>
            </div>
            <div className="flex items-center gap-5">
              <button type="button" className="btn btn-outline" onClick={() => window.history.back()}>
              Close
            </button>
            <button type="submit" className="btn bg-[#DE472D] hover:bg-[#cf4a32] text-white ">
              Save
            </button>
            </div>
          </div>
        </form>
      </div>
      </div>
    </section>
  )
}

export default AddProduct
