USE master;
GO
IF EXISTS (SELECT 1 FROM sys.databases WHERE name = 'PhoneStore')
    DROP DATABASE PhoneStore;
GO

CREATE DATABASE PhoneStore;
GO

USE PhoneStore;
GO

CREATE TABLE LocationProvince
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    LetterCode CHAR(3) NULL,
    NumberCode TINYINT NULL,
    ProvinceName VARCHAR(50) NULL,
    ProvinceNameFULL VARCHAR(100) NULL,
    ProvinceNameFULLVN NVARCHAR(200) NULL,
    IsEnable TINYINT NULL,
    Region VARCHAR(100) NULL,
    RegionVN NVARCHAR(100) NULL
);
GO
CREATE TABLE LocationDistrict
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    ProvinceID INT NULL,
    DistrictID INT NULL,
    LetterCode CHAR(3) NULL,
    NumberCode TINYINT NULL,
    DistrictName VARCHAR(50) NULL,
    DistrictNameFULL VARCHAR(100) NULL,
    DistrictNameFULLVN NVARCHAR(200) NULL,
    IsEnable TINYINT NULL
);
GO
CREATE TABLE LocationWard
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    DistrictID INT NULL,
    LetterCode CHAR(3) NULL,
    NumberCode TINYINT NULL,
    WardName VARCHAR(50) NULL,
    WardNameFull VARCHAR(100) NULL,
    WardNameFullVN VARCHAR(200) NULL,
    IsEnable TINYINT NULL
);
GO
CREATE TABLE EmployeeInfo
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    EmployeeID BIGINT NULL,
    Name VARCHAR(20) NULL,
    FullName VARCHAR(150) NULL,
    NameVN NVARCHAR(30) NULL,
    FullNameVN NVARCHAR(300) NULL,
    CitizenID VARCHAR(12) NULL,
    Phone VARCHAR(12) NULL,
    HouseNumber VARCHAR(20) NULL,
    RoadName VARCHAR(50) NULL,
    LocationWardID INT NULL,
    LocationDistrictId INT NULL,
    LocationProvinceId INT NULL,
    Email VARCHAR(50) NULL,
    HomeTownHouseNumber VARCHAR(12) NULL,
    HomeTownRoadName VARCHAR(50) NULL,
    HomeTownWardName VARCHAR(50) NULL,
    HomeTownDistrictName VARCHAR(50) NULL,
    HomeTownProvinceName VARCHAR(50) NULL,
    IsEnable TINYINT NULL,
    StartDate DATE NULL,
    EndDate DATE NULL
);
GO
CREATE TABLE Account
(
    ID INT IDENTITY(1, 1) PRIMARY KEY,
    EmployeeID INT NULL,
    DisplayName NVARCHAR(50) NULL,
    AccountName VARCHAR(20) NULL,
    Password VARCHAR(100) NULL,
    CreatedDate DATETIME NULL,
    CreatedByUser VARCHAR(20) NULL,
    IsEnable TINYINT NULL,
    ModifiedDate DATETIME NULL,
    ModifiedByUser VARCHAR(20) NULL,
    IsHas TINYINT NULL,
    TypeHas TINYINT NULL -- 1 MD5, 2 SHA1, SELECT sys.fn_varbintohexsubstring(0, HashBytes('md5', 'password'),1,0)
);
GO

ALTER PROC GetAllAccount
AS
BEGIN
    SELECT A.EmployeeID,
           E.FullNameVN,
           A.AccountName,
           A.Password,
           A.CreatedDate,
           A.CreatedByUser,
           A.ModifiedDate,
           A.ModifiedByUser
    FROM Account A (NOLOCK)
        LEFT JOIN EmployeeInfo E (NOLOCK)
            ON E.EmployeeID = A.EmployeeID
    WHERE A.IsEnable = 1;
END;
GO

ALTER PROC Get_AccountByEmployeeID @EmployeeID INT
AS
BEGIN
    SELECT A.EmployeeID,
           E.FullNameVN,
           A.AccountName,
           A.Password,
           A.CreatedDate,
           A.CreatedByUser,
           A.ModifiedDate,
           A.ModifiedByUser
    FROM Account A (NOLOCK)
        LEFT JOIN EmployeeInfo E (NOLOCK)
            ON E.EmployeeID = A.EmployeeID
    WHERE A.EmployeeID = @EmployeeID
          AND A.IsEnable = 1;
END;
GO

ALTER PROC sp_Login
    @Account VARCHAR(50),
    @Password VARCHAR(50)
AS
BEGIN
    DECLARE @Count INT;
    DECLARE @res BIT;

    SELECT @Count = COUNT(1)
    FROM Account
    WHERE AccountName = @Account
          AND Password = sys.fn_varbintohexsubstring(0, HASHBYTES('md5', @Password), 1, 0)
          AND IsEnable = 1;
    IF @Count > 0
        SET @res = 1;
    ELSE
        SET @res = 0;

    SELECT @res;
END;

INSERT INTO Account
(
    AccountName,
    Password,
    IsEnable
)
VALUES
('admin', sys.fn_varbintohexsubstring(0, HASHBYTES('md5', 'admin'), 1, 0), 1);

GO
ALTER PROC GetEmployeeInfoByEmployeeID @EmployeeID INT
AS
BEGIN
    SELECT ROW_NUMBER() OVER (ORDER BY E.StartDate) ID,
           FullNameVN Name,
           E.IsEnable,
           CitizenID,
           Phone,
           BirthDay,
           EmployeeID,
           HouseNumber + ', ' + RoadName + ', ' + W.WardNameFullVN + ', ' + D.DistrictNameFULLVN + ', '
           + P.ProvinceNameFULLVN AS Location,
           HomeTownHouseNumber + ', ' + HomeTownRoadName + ', ' + W1.WardNameFullVN + ', ' + D1.DistrictNameFULLVN
           + ', ' + P1.ProvinceNameFULLVN AS HomeTown,
           StartDate,
           EndDate
    FROM EmployeeInfo E
        LEFT JOIN LocationWard W (NOLOCK)
            ON W.ID = E.LocationWardID
        LEFT JOIN LocationDistrict D (NOLOCK)
            ON D.DistrictID = E.LocationDistrictId
        LEFT JOIN LocationProvince P (NOLOCK)
            ON P.ID = E.LocationProvinceId
        LEFT JOIN LocationWard W1 (NOLOCK)
            ON W1.ID = E.HomeTownWardName
        LEFT JOIN LocationDistrict D1 (NOLOCK)
            ON D1.DistrictID = E.HomeTownDistrictName
        LEFT JOIN LocationProvince P1 (NOLOCK)
            ON P1.ID = E.HomeTownProvinceName
    WHERE E.IsEnable = 1
          AND E.EmployeeID = @EmployeeID;
END;
GO

CREATE PROC ListEmployee
AS
BEGIN
    SELECT ROW_NUMBER() OVER (ORDER BY E.StartDate) ID,
           FullNameVN Name,
           E.IsEnable,
           CitizenID,
           Phone,
           BirthDay,
           EmployeeID,
           HouseNumber + ', ' + RoadName + ', ' + W.WardNameFullVN + ', ' + D.DistrictNameFULLVN + ', '
           + P.ProvinceNameFULLVN AS Location,
           HomeTownHouseNumber + ', ' + HomeTownRoadName + ', ' + W1.WardNameFullVN + ', ' + D1.DistrictNameFULLVN
           + ', ' + P1.ProvinceNameFULLVN AS HomeTown,
           StartDate,
           EndDate
    FROM EmployeeInfo E
        LEFT JOIN LocationWard W (NOLOCK)
            ON W.ID = E.LocationWardID
        LEFT JOIN LocationDistrict D (NOLOCK)
            ON D.DistrictID = E.LocationDistrictId
        LEFT JOIN LocationProvince P (NOLOCK)
            ON P.ID = E.LocationProvinceId
        LEFT JOIN LocationWard W1 (NOLOCK)
            ON W1.ID = E.HomeTownWardName
        LEFT JOIN LocationDistrict D1 (NOLOCK)
            ON D1.DistrictID = E.HomeTownDistrictName
        LEFT JOIN LocationProvince P1 (NOLOCK)
            ON P1.ID = E.HomeTownProvinceName
    WHERE E.IsEnable = 1;
END;

GO

CREATE PROC Delete_EmployeeInfo @EmployeeID INT
AS
BEGIN
    IF EXISTS
    (
        SELECT 1
        FROM EmployeeInfo
        WHERE EmployeeID = @EmployeeID
              AND IsEnable = 1
    )
        SELECT 1 AS Result;
    ELSE
        SELECT 0 AS Result;
END;
GO

CREATE PROC Insert_EmployeeInfo
    @EmployeeID INT,
    @FullNameVN NVARCHAR(200),
    @CitizenID INT,
    @Phone VARCHAR(200),
    @BirthDay DATE,
    @HouseNumber VARCHAR(20),
    @RoadName NVARCHAR(200),
    @LocationWardID INT,
    @LocationDistrictId INT,
    @LocationProvinceId INT,
    @Email VARCHAR(200),
    @HomeTownHouseNumber VARCHAR(20),
    @HomeTownRoadName NVARCHAR(200),
    @HomeTownWardName INT,
    @HomeTownDistrictName INT,
    @HomeTownProvinceName INT
AS
BEGIN
    IF EXISTS
    (
        SELECT 1
        FROM EmployeeInfo
        WHERE EmployeeID = @EmployeeID
              AND IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM EmployeeInfo
        WHERE EmployeeID = @EmployeeID
              AND IsEnable = 0
    )
    BEGIN
        UPDATE EmployeeInfo
        SET IsEnable = 1,
            CitizenID = @CitizenID
        WHERE EmployeeID = @EmployeeID;
    END;
    ELSE
    BEGIN
        INSERT INTO EmployeeInfo
        (
            EmployeeID,
            FullNameVN,
            CitizenID,
            Phone,
            BirthDay,
            HouseNumber,
            RoadName,
            LocationWardID,
            LocationDistrictId,
            LocationProvinceId,
            Email,
            HomeTownHouseNumber,
            HomeTownRoadName,
            HomeTownDistrictName,
            HomeTownProvinceName
        )
        VALUES
        (@EmployeeID, @FullNameVN, @CitizenID, @Phone, @BirthDay, @HouseNumber, @RoadName, @LocationWardID,
         @LocationDistrictId, @LocationProvinceId, @Email, @HomeTownHouseNumber, @HomeTownRoadName, @HomeTownWardName,
         @HomeTownDistrictName, @HomeTownProvinceName);
        SELECT SCOPE_IDENTITY() AS Result;
    END;
END;

GO

CREATE PROC GET_All_Province
AS
BEGIN
    SELECT ID,
           ProvinceNameFULLVN
    FROM LocationProvince;
END;
GO

ALTER PROC GET_ByProvinceID_District @ProvinceID INT
AS
BEGIN
    SELECT DistrictID,
           DistrictNameFULLVN
    FROM LocationDistrict
    WHERE ProvinceID = @ProvinceID;
END;
GO

CREATE PROC Get_Ward_ByDistrictID @DistrictID INT
AS
BEGIN
    SELECT ID,
           WardNameFullVN
    FROM LocationWard
    WHERE DistrictID = @DistrictID;
END;

GO

CREATE TABLE Category
(
    ID INT IDENTITY(2, 2) PRIMARY KEY,
    CateName NVARCHAR(100) NULL,
    IsEnable INT
);
GO

CREATE PROC GET_All_Category
AS
BEGIN
    SELECT ID,
           CateName
    FROM dbo.Category
    WHERE IsEnable = 1;
END;
GO
INSERT INTO dbo.Category
(
    CateName
)
VALUES
(N'Điện'),
(N'Nước'),
(N'Ống'),
(N'Xe'),
(N'Đồ chơi'),
(N'Phụ trợ'),
(N'Công trình'),
(N'Tivi'),
(N'Tủ lạnh'),
(N'Nồi cơm'),
(N'Loa'),
(N'Máy lạnh'),
(N'Quạt'),
(N'Bếp điện');
GO

UPDATE dbo.Category
SET IsEnable = 1;
GO

CREATE PROC GetCategoryByCateName @CateName NVARCHAR(100)
AS
BEGIN
    SELECT ID,
           CateName
    FROM dbo.Category
    WHERE IsEnable = 1
          AND CateName LIKE N'%' + @CateName + '%';
END;
GO
CREATE PROC Insert_Category @CateName NVARCHAR(100)
AS
BEGIN
    IF EXISTS
    (
        SELECT 1
        FROM dbo.Category
        WHERE CateName = @CateName
              AND IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM dbo.Category
        WHERE CateName = @CateName
              AND IsEnable = 0
    )
    BEGIN
        UPDATE dbo.Category
        SET IsEnable = 1
        WHERE CateName = @CateName;
        SELECT -1 AS Result;
    END;
    ELSE
    BEGIN
        INSERT INTO dbo.Category
        (
            CateName,
            IsEnable
        )
        VALUES
        (@CateName, 1);
        SELECT SCOPE_IDENTITY() AS Result;
    END;
END;
GO

ALTER PROC Delete_Category @ID INT
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM dbo.Category WHERE ID = @ID AND IsEnable = 1)
        SELECT 0 AS Result;
    ELSE IF EXISTS (SELECT 1 FROM dbo.Category WHERE ID = @ID AND IsEnable = 0)
    BEGIN
        SELECT -1 AS Result;
    END;
    ELSE
    BEGIN
        UPDATE dbo.Category
        SET IsEnable = 0
        WHERE ID = @ID;
        SELECT 1 AS Result;
    END;
END;
GO

ALTER PROC Update_Category
    @ID INT,
    @CateName NVARCHAR(100)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM dbo.Category WHERE ID = @ID AND IsEnable = 0)
        SELECT 0 AS Result;
    IF NOT EXISTS (SELECT 1 FROM dbo.Category WHERE ID = @ID AND IsEnable = 1)
        SELECT -1 AS Result;
    IF EXISTS
    (
        SELECT 1
        FROM dbo.Category
        WHERE CateName = @CateName
              AND IsEnable = 1
    )
        SELECT -2 AS Result;
    IF EXISTS (SELECT 1 FROM dbo.Category WHERE ID = @ID AND IsEnable = 1)
    BEGIN
        UPDATE dbo.Category
        SET CateName = @CateName
        WHERE ID = @ID;
        SELECT 1 AS Result;
    END;
END;
GO

CREATE TABLE Consumer
(
    ID INT IDENTITY(1, 1) PRIMARY KEY NOT NULL,
    Name NVARCHAR(150) NULL,
    CMND VARCHAR(12) NULL,
    Location NVARCHAR(200) NULL,
    Phone VARCHAR(20) NULL,
    Email VARCHAR(150) NULL,
    BirthDay DATE NULL,
    CreatedDate DATETIME NULL,
    VipConsumerId INT NULL,
    Score INT NULL,
    IsEnable SMALLINT NULL,
	ModifiedDate DATETIME
);
GO

CREATE TABLE VipConsumer
(
    ID INT IDENTITY(2, 2) PRIMARY KEY NOT NULL,
    VipName NVARCHAR(150) NULL,
    IsEnable INT NULL,
    CreateDated DATETIME NULL,
    CreatedBy VARCHAR(20) NULL,
    ModifiedDate DATETIME NULL,
    ModifiedByUser VARCHAR(20) NULL
);
GO
INSERT INTO dbo.VipConsumer
(
    VipName,
    IsEnable,
    CreateDated,
    CreatedBy,
    ModifiedDate,
    ModifiedByUser
)
VALUES
(   N'Khách hàng thân thiết', -- VipName - nvarchar(150)
    1,                        -- IsEnable - int
    GETDATE(),                -- CreateDated - datetime
    'Admin',                  -- CreatedBy - varchar(20)
    NULL,                     -- ModifiedDate - datetime
    NULL                      -- ModifiedByUser - varchar(20)
    );
GO
ALTER PROC getAllVip
AS
BEGIN
    SELECT vc.ID,
           vc.VipName,
           CASE vc.IsEnable
               WHEN 1 THEN
                   'Active'
               WHEN 0 THEN
                   'Not Active'
           END [Enable],
           vc.CreateDated,
           vc.CreatedBy,
           vc.ModifiedDate,
           vc.ModifiedByUser
    FROM dbo.VipConsumer AS vc
    WHERE vc.IsEnable = 1;
END;
GO

ALTER PROC getVipByName (@VipName NVARCHAR(150) = 0)
AS
BEGIN
    SELECT vc.ID,
           vc.VipName,
           CASE vc.IsEnable
               WHEN 1 THEN
                   'Active'
               WHEN 0 THEN
                   'Not Active'
           END [Enable],
           vc.CreateDated,
           vc.CreatedBy,
           vc.ModifiedDate,
           vc.ModifiedByUser
    FROM dbo.VipConsumer AS vc
    WHERE vc.IsEnable = 1
          AND
          (
              (@VipName = '')
              OR (@VipName LIKE N'%' + @VipName + '%')
          );
END;
GO
CREATE PROC Insert_VipConsumer @VipName NVARCHAR(150)
AS
BEGIN
    IF EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.VipName = @VipName
              AND vc.IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.VipName = @VipName
              AND vc.IsEnable = 0
    )
    BEGIN
        UPDATE dbo.VipConsumer
        SET IsEnable = 1,
            ModifiedDate = GETDATE()
        WHERE VipName = @VipName;
        SELECT -1 AS Result;
    END;
    ELSE
    BEGIN
        INSERT INTO dbo.VipConsumer
        (
            VipName,
            IsEnable,
            CreateDated,
            CreatedBy
        )
        VALUES
        (   @VipName,  -- VipName - nvarchar(150)
            1,         -- IsEnable - int
            GETDATE(), -- CreateDated - datetime
            'Admin');
        SELECT SCOPE_IDENTITY() AS Result;
    END;
END;
GO
CREATE PROC DeleteVipConsumer (@ID INT)
AS
BEGIN
    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.ID = @ID
              AND vc.IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.ID = @ID
              AND vc.IsEnable = 0
    )
        SELECT -1 AS Result;
    ELSE
    BEGIN
        UPDATE dbo.VipConsumer
        SET IsEnable = 0,
            ModifiedDate = GETDATE(),
            ModifiedByUser = 'Admin'
        WHERE ID = @ID;
        SELECT 1 AS Result;
    END;
END;
GO
CREATE PROC UpdateVipConsumer
(
    @ID INT,
    @VipName NVARCHAR(100)
)
AS
BEGIN
    IF NOT EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.ID = @ID
              AND vc.IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM dbo.VipConsumer AS vc
        WHERE vc.ID = @ID
              AND vc.IsEnable = 0
    )
        SELECT -1 AS Result;
    ELSE
    BEGIN
        UPDATE dbo.VipConsumer
        SET ModifiedDate = GETDATE(),
            ModifiedByUser = 'Admin',
            VipName = @VipName
        WHERE ID = @ID;
        SELECT 1 AS Result;
    END;
END;
go
Create PROC GetConsumer
AS
BEGIN
	SELECT C.Id, Name, CMND, Location, 
			Phone, BirthDay, CreatedDate, vc.VipName, 
			CASe c.isenable when 1 then 'Active' When 0 then 'NotActive' END Enable, c.ModifiedDate
	FROM Consumer C (Nolock)
	LEFT JOIN VipConsumer VC (Nolock) ON VC.ID = C.VipConsumerId
END
GO
CREATE PROC DeleteConsumer
@ID INT
AS
BEGIN
	IF EXISTS(SELECT 1 FROM Consumer WHERE ID = @ID AND IsEnable = 0)
		select 0 as Result;
	IF EXISTS(SELECT 1 FROM Consumer where id = @ID)
		SELECT - 1 AS Result;
	IF EXISTS (SELECT 1 FROM Consumer WHERE id = @ID AND IsEnable = 1)
	begin
		update Consumer set IsEnable = 0, ModifiedDate =GETDATE() where ID = @ID
		SELect 1 as Result;
	end
END
GO

CREATE PROC UpdateConsumer
@ID INT,
@Name NVARCHAR(150),
@CMND VARCHAR(12),
@Location NVARCHAR(200),
@Phone VARCHAR(20),
@Email VARCHAR(150),
@BirthDay DATE
AS
BEGIN
	IF EXISTS(SELECT 1 FROM Consumer WHERE ID = @ID AND IsEnable = 0)
		select 0 as Result;
	IF EXISTS(SELECT 1 FROM Consumer where id = @ID)
		SELECT - 1 AS Result;
	IF EXISTS (SELECT 1 FROM Consumer WHERE id = @ID AND IsEnable = 1)
	BEGIN
		update Consumer
		set Name = @Name, CMND = @CMND, Location = @Location, Phone = @Phone,
				Email = @Email, BirthDay = @BirthDay
		where id = @ID

		select 1 as Result
	END
END
GO

CREATE PROC InsertConsumer
@ID INT,
@Name NVARCHAR(150),
@CMND VARCHAR(12),
@Location NVARCHAR(200),
@Phone VARCHAR(20),
@Email VARCHAR(150),
@BirthDay DATE
as
begin
	 IF EXISTS
    (
        SELECT 1
        FROM dbo.Consumer AS vc
        WHERE vc.Id = @ID and Name = @Name
              AND vc.IsEnable = 1
    )
        SELECT 0 AS Result;
    ELSE IF EXISTS
    (
        SELECT 1
        FROM dbo.Consumer AS vc
        WHERE vc.Id = @ID and Name = @Name
              AND vc.IsEnable = 0
    )
    BEGIN
        UPDATE dbo.Consumer
        SET IsEnable = 1,
            ModifiedDate = GETDATE()
        WHERE ID = @ID;
        SELECT -1 AS Result;
    END;
    ELSE
    BEGIN
        INSERT INTO dbo.Consumer
		(
			Name,
			CMND, Location, Phone,Email, BirthDay, CreatedDate, IsEnable
		)
		values (@Name, @CMND, @Location, @Phone, @Email, @BirthDay, GETDATE(), 1)
    END;
end