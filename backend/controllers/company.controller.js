// import { Company } from "../models/company.model.js";

// export const registerCompany = async (req, res) => {
//   try {
//     const { companyName } = req.body;
//     if (!companyName) {
//       return res.status(400).json({
//         error: "Company name is required",
//         status: false,
//       });
//     }
//     let company = await Company.findOne({ name: companyName });
//     if (company) {
//       return res.status(400).json({
//         error: "Company already exists",
//         status: false,
//       });
//     }
//     company = await Company.create({
//       name: companyName,
//       user_Id: req.Id,
//     });
//     return res.status(201).json({
//       message: "Company registered successfully",
//       status: true,
//     });
//   } catch (err) {
//     console.error("Company registration error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

// export const getCompany = async (req, res) => {
//   try {
//     const userId = req.id; //logged in user id
//     const company = await Company.find({ user_Id });
//     if (!company) {
//       return res.status(400).json({
//         error: "Company not found",
//         status: false,
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       company,
//     });
//   } catch (err) {
//     console.error("Company registration error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

// export const getCompanyById = async (req, res) => {
//   try {
//     const { companyId } = req.params;
//     const company = await Company.findById(companyId);
//     if (!company) {
//       return res.status(400).json({
//         error: "Company not found",
//         status: false,
//       });
//     }
//     return res.status(200).json({
//       status: true,
//       company,
//     });
//   } catch (err) {
//     console.error("Company registration error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };

// export const updateCompany = async (req, res) => {
//   try {
//     const { name, description, website, location } = req.body;
//     const file = req.file;
//     const updateData = { name, description, website, location };
//     const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//     });
//     if (!company) {
//       return res.status(400).json({
//         error: "Company not found",
//         status: false,
//       });
//     }
//     return res.status(200).json({
//       message: "Company updated successfully",
//       status: true,
//       company,
//     });
//   } catch (err) {
//     console.error("Company update error:", err);
//     return res.status(500).json({
//       error: "Internal server error",
//       details: err.message,
//     });
//   }
// };
import { Company } from "../models/company.model.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                error: "Company name is required",
                status: false,
            });
        }

        let company = await Company.findOne({
            name: { $regex: new RegExp(`^${companyName}$`, 'i') }
        });

        if (company) {
            return res.status(400).json({
                error: "Company already exists",
                status: false,
            });
        }

        company = await Company.create({
            name: companyName,
            user_Id: req.id,  // Using req.id from isAuth middleware
        });

        return res.status(201).json({
            message: "Company registered successfully",
            status: true,
            company
        });
    } catch (err) {
        console.error("Company registration error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};

export const getCompany = async (req, res) => {
    try {
        const companies = await Company.find({ user_Id: req.id });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                error: "No companies found for this user",
                status: false,
            });
        }

        return res.status(200).json({
            status: true,
            companies,
        });
    } catch (err) {
        console.error("Get companies error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                error: "Company not found",
                status: false,
            });
        }

        return res.status(200).json({
            status: true,
            company,
        });
    } catch (err) {
        console.error("Get company error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = req.params.id;

        // Check if company exists
        const existingCompany = await Company.findById(companyId);

        if (!existingCompany) {
            return res.status(404).json({
                error: "Company not found",
                status: false,
            });
        }

        // Check if user owns the company
        if (existingCompany.user_Id.toString() !== req.id) {
            return res.status(403).json({
                error: "Not authorized to update this company",
                status: false,
            });
        }

        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(
            companyId,
            updateData,
            { new: true }
        );

        return res.status(200).json({
            message: "Company updated successfully",
            status: true,
            company,
        });
    } catch (err) {
        console.error("Company update error:", err);
        return res.status(500).json({
            error: "Internal server error",
            details: err.message,
        });
    }
};