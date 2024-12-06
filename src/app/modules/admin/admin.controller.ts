import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { adminServices } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
    const result = await adminServices.getAllAdminFromDb();
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'All admins are retrieved successfully',
        data: result,
    });
})

const getSingleAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminServices.getSingleAdminFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Admin retrieved successfully',
        data: result,
    });
})

const deleteAdmin = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await adminServices.deleteAdminFromDb(id);
    res.status(StatusCodes.OK).json({
        success: true,
        message: 'Admin id deleted successfully',
        data: result,
    });
})

export const AdminController = {
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin
}