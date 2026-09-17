// Động cơ Phân tích Giả thiết Nghề nghiệp (career-engine.js)
// Chuyển đổi từ "Phán xét định mệnh" sang "Giả thiết nghề nghiệp dựa trên bằng chứng (Career Hypotheses)"
// Tuân thủ: Hiển thị Bằng chứng (Evidence) + Mâu thuẫn/Thách thức + Điều Orion chưa biết (Unknowns)

class OrionCareerEngine {
  constructor() {
    this.careers = typeof CAREERS_DATABASE !== 'undefined' ? CAREERS_DATABASE : [];
  }

  /**
   * Tính toán điểm RIASEC từ bảng trả lời trắc nghiệm
   * @param {object} answers { R: 6, I: 7, A: 3, S: 4, E: 5, C: 4 }
   */
  calculateRiasecScores(answers) {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    for (const key in answers) {
      if (scores.hasOwnProperty(key)) {
        scores[key] = Math.max(0, parseInt(answers[key], 10) || 0);
      }
    }
    return scores;
  }

  /**
   * Xác định nhóm sở thích nổi trội
   * @param {object} riasecScores 
   */
  getTopRiasecCodes(riasecScores) {
    return Object.entries(riasecScores)
      .sort((a, b) => b[1] - a[1])
      .map(item => item[0]);
  }

  /**
   * Tạo 3 - 5 Giả thiết Nghề nghiệp (Career Hypotheses)
   * @param {object} params { riasecScores, academic: { math, lit, eng }, targets }
   */
  generateCareerHypotheses(params) {
    const { riasecScores, academic = { math: 7, lit: 7, eng: 7 }, targets = [] } = params;
    const sortedCodes = this.getTopRiasecCodes(riasecScores);
    const primary = sortedCodes[0] || 'I';
    const secondary = sortedCodes[1] || 'R';
    const tertiary = sortedCodes[2] || 'C';

    const hypotheses = [];

    // Duyệt qua kho dữ liệu ngành nghề để đối chiếu tín hiệu
    this.careers.forEach(career => {
      let matchCount = 0;
      if (career.riasec.includes(primary)) matchCount += 3;
      if (career.riasec.includes(secondary)) matchCount += 2;
      if (career.riasec.includes(tertiary)) matchCount += 1;

      // Tính toán tín hiệu dựa trên học lực (nếu có cung cấp)
      const hasMath = academic && academic.math !== null && academic.math !== undefined && !isNaN(parseFloat(academic.math));
      const hasEng = academic && academic.eng !== null && academic.eng !== undefined && !isNaN(parseFloat(academic.eng));
      const mathScore = hasMath ? parseFloat(academic.math) : null;
      const engScore = hasEng ? parseFloat(academic.eng) : null;

      let signalLevel = "Đang khám phá";
      const evidenceList = [];
      const conflictList = [...(career.potentialConflicts || [])];

      // Đánh giá tín hiệu cho nhóm kỹ thuật/công nghệ
      if (career.riasec.includes('I') || career.riasec.includes('R')) {
        if (hasMath && mathScore >= 8.0) {
          evidenceList.push(`Điểm môn Toán học lực tốt (${mathScore}/10) - hỗ trợ năng lực tư duy logic/mô hình.`);
          matchCount += 2;
        } else if (hasMath && mathScore < 6.5) {
          conflictList.unshift(`Điểm môn Toán hiện tại (${mathScore}) có thể là thử thách nếu học kỹ thuật chuyên sâu.`);
        }
      }

      // Đánh giá tín hiệu cho nhóm nghệ thuật/sáng tạo
      if (career.riasec.includes('A')) {
        evidenceList.push(`Nhóm Nghệ thuật (${riasecScores.A}đ) - thể hiện sự nhạy bén về thẩm mỹ và cách diễn đạt ý tưởng.`);
      }

      // Đánh giá tín hiệu cho nhóm xã hội/y tế
      if (career.riasec.includes('S')) {
        evidenceList.push(`Nhóm Xã hội (${riasecScores.S}đ) - có xu hướng thấu cảm và thích chăm sóc, hỗ trợ cộng đồng.`);
      }

      // Đánh giá ngoại ngữ
      if (hasEng && engScore >= 7.5) {
        evidenceList.push(`Điểm Tiếng Anh thuận lợi (${engScore}/10) để tiếp cận tài liệu chuẩn quốc tế.`);
      }

      // ponytail: Nhẹ nhàng đối chiếu mục tiêu học sinh chủ động quan tâm nếu có
      if (targets && Array.isArray(targets) && targets.length > 0) {
        const targetStr = targets.join(' ').toLowerCase();
        const isTargetMatch =
          (career.id === 'ai_ml_engineer' && (targetStr.includes('tech') || targetStr.includes('công nghệ') || targetStr.includes('lập trình'))) ||
          (career.id === 'chip_design_engineer' && (targetStr.includes('semiconductor') || targetStr.includes('điện tử') || targetStr.includes('phần cứng'))) ||
          (career.id === 'data_analyst' && (targetStr.includes('business') || targetStr.includes('kinh tế') || targetStr.includes('dữ liệu'))) ||
          (career.id === 'healthcare_practitioner' && (targetStr.includes('health') || targetStr.includes('sức khỏe') || targetStr.includes('y tế'))) ||
          (career.id === 'ui_ux_designer' && (targetStr.includes('design') || targetStr.includes('thiết kế') || targetStr.includes('sáng tạo'))) ||
          (career.id === 'esg_sustainability_specialist' && (targetStr.includes('environment') || targetStr.includes('môi trường') || targetStr.includes('bền vững') || targetStr.includes('esg')));

        if (isTargetMatch) {
          matchCount += 1;
          evidenceList.push(`Trùng khớp với định hướng ngành nghề em đang chủ động quan tâm.`);
        }
      }

      // Phân tầng tín hiệu chuẩn hóa (Section 15: strong | moderate | exploratory)
      let signalKey = 'exploratory';
      let signalLabel = 'Đang khám phá';

      if (matchCount >= 5) {
        signalKey = 'strong';
        signalLabel = 'Tín hiệu mạnh';
      } else if (matchCount >= 3) {
        signalKey = 'moderate';
        signalLabel = 'Tín hiệu vừa';
      }

      const finalEvidence = evidenceList.length > 0 ? evidenceList : [`Sở thích nghề nghiệp tương đồng với nhóm ${career.riasec.join('/')}`];
      const finalUnknowns = [...(career.unknownsToTest || [
        "Mức độ hứng thú thực tế của em khi làm việc này liên tục mỗi ngày?",
        "Khả năng thích ứng với môi trường làm việc đặc thù của ngành này?"
      ])];
      if (!hasMath && !hasEng) {
        finalUnknowns.unshift("Chưa có dữ liệu điểm học thuật THPT (chế độ Khảo sát Nhanh) để đối chiếu năng lực chuyên sâu.");
      }
      const experimentsList = career.recommendedExperiment ? [career.recommendedExperiment] : [];
      const educationPathsList = career.pathways || career.entryRoutes || [];

      hypotheses.push({
        id: career.id,
        careerId: career.id,
        career: career.name,
        name: career.name,
        field: career.field || "Công nghệ & Kỹ thuật",
        desc: career.desc,
        whatYouActuallyDo: career.whatYouActuallyDo || career.desc,
        typicalTasks: career.typicalTasks || [],
        skills: career.skills || { foundation: [], working: [], strong: [] },
        evidenceStudentCanBuild: career.evidenceStudentCanBuild || [],
        entryRoutes: career.entryRoutes || educationPathsList,
        adjacentCareers: career.adjacentCareers || [],
        signalLevel: signalKey, // 'strong' | 'moderate' | 'exploratory'
        signalLevelLabel: signalLabel, // 'Tín hiệu mạnh' | 'Tín hiệu vừa' | 'Đang khám phá'
        scoreRank: matchCount,
        whySuggested: `Sở thích nghề nghiệp RIASEC của em nổi trội ở nhóm ${primary} và ${secondary}. ${career.signalBase}`,
        supportingEvidence: finalEvidence,
        evidenceFor: finalEvidence,
        conflicts: conflictList,
        unknowns: finalUnknowns,
        experiments: experimentsList,
        experiment: career.recommendedExperiment,
        educationPaths: educationPathsList,
        pathways: educationPathsList,
        salary: career.salary,
        laborDemand: career.laborDemand,
        aiExposure: career.aiExposure || 'Vừa',
        humanAdvantage: career.humanAdvantage || 'Cao',
        transformationDirection: career.transformationDirection || '',
        evidenceConfidence: career.evidenceConfidence || 'Cao',
        dataUpdated: career.dataUpdated || '2026-Q1',
        aiAdaptability: career.aiAdaptability,
        aiReplacementRisk: career.aiReplacementRisk || 'Thấp',
        humanCoreSkill: career.humanCoreSkill || 'Tư duy logic & Sáng tạo',
        aiSynergyTip: career.aiSynergyTip || 'Ứng dụng AI như trợ lý tăng tốc độ công việc'
      });
    });

    // Sắp xếp theo độ mạnh của tín hiệu và lấy top 4 giả thiết
    hypotheses.sort((a, b) => b.scoreRank - a.scoreRank);
    return hypotheses.slice(0, 4);
  }

  /**
   * Xác thực và làm sạch phản hồi Giả thiết Nghề nghiệp có cấu trúc (Section 22)
   * Ngăn ngừa sập UI khi dữ liệu AI bị lỗi định dạng
   * @param {any} input 
   * @param {object} fallbackParams 
   */
  validateCareerHypotheses(input, fallbackParams = null) {
    try {
      let parsed = input;
      if (typeof input === 'string') {
        parsed = JSON.parse(input);
      }
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Dữ liệu không phải là danh sách hợp lệ');
      }

      const validSignalLevels = ['strong', 'moderate', 'exploratory'];
      const validated = parsed.slice(0, 5).map((item, idx) => {
        const id = item.id || `hypo_${idx + 1}`;
        const career = item.career || item.name || `Hướng nghề nghiệp ${idx + 1}`;
        const field = item.field || 'Đa ngành';
        let signalLevel = item.signalLevel;
        if (!validSignalLevels.includes(signalLevel)) {
          signalLevel = 'moderate';
        }
        const signalLevelLabel = signalLevel === 'strong' ? 'Tín hiệu mạnh' : (signalLevel === 'moderate' ? 'Tín hiệu vừa' : 'Đang khám phá');
        const supportingEvidence = Array.isArray(item.supportingEvidence) ? item.supportingEvidence.slice(0, 5) : (Array.isArray(item.evidenceFor) ? item.evidenceFor.slice(0, 5) : ['Dữ liệu sở thích hiện tại']);
        const conflicts = Array.isArray(item.conflicts) ? item.conflicts.slice(0, 5) : [];
        const unknowns = Array.isArray(item.unknowns) ? item.unknowns.slice(0, 5) : ['Mức độ kiên trì thực tế'];
        const experiments = Array.isArray(item.experiments) ? item.experiments.slice(0, 3) : (item.experiment ? [item.experiment] : []);
        const educationPaths = Array.isArray(item.educationPaths) ? item.educationPaths.slice(0, 4) : (Array.isArray(item.pathways) ? item.pathways.slice(0, 4) : []);

        return {
          id,
          careerId: id,
          career,
          name: career,
          field,
          desc: item.desc || '',
          signalLevel,
          signalLevelLabel,
          whySuggested: item.whySuggested || 'Dựa trên phân tích năng lực và sở thích.',
          supportingEvidence,
          evidenceFor: supportingEvidence,
          conflicts,
          unknowns,
          experiments,
          experiment: experiments[0] || null,
          educationPaths,
          pathways: educationPaths,
          salary: item.salary || { range: "Thu nhập thay đổi đáng kể theo kinh nghiệm, địa phương và doanh nghiệp. Xem nguồn dữ liệu.", note: "Tham khảo khảo sát thị trường" },
          aiReplacementRisk: item.aiReplacementRisk || 'Thấp',
          humanCoreSkill: item.humanCoreSkill || 'Tư duy logic & Sáng tạo',
          aiSynergyTip: item.aiSynergyTip || 'Ứng dụng AI như trợ lý tăng tốc độ công việc'
        };
      });

      return validated;
    } catch (err) {
      console.warn('Lỗi phân tích JSON giả thiết nghề nghiệp, sử dụng bộ sinh giả thiết chuẩn:', err.message);
      if (fallbackParams) {
        return this.generateCareerHypotheses(fallbackParams);
      }
      return this.generateCareerHypotheses({ riasecScores: { R: 2, I: 2, A: 2, S: 2, E: 2, C: 2 } });
    }
  }

  /**
   * Lựa chọn môn học THPT & Tổ hợp xét tuyển Đại học
   * @param {string} primary 
   * @param {object} academic 
   */
  recommendCombination(primary, academic = {}) {
    const math = parseFloat(academic.math) || 7.5;
    const eng = parseFloat(academic.eng) || 7.5;

    let primaryCombo = 'A01';
    let backupCombo = 'D01';
    let rationale = '';

    if (primary === 'I' || primary === 'R') {
      if (math >= 8.0 && eng >= 7.5) {
        primaryCombo = 'A01';
        backupCombo = 'A00';
        rationale = 'Thế mạnh tự nhiên và ngoại ngữ tốt giúp em có lợi thế cạnh tranh vào các khối ngành Công nghệ thông tin, Trí tuệ Nhân tạo, Vi mạch Bán dẫn.';
      } else {
        primaryCombo = 'A00';
        backupCombo = 'A01';
        rationale = 'Tổ hợp truyền thống Toán - Lý - Hóa mở rộng tối đa cơ hội xét tuyển vào tất cả các trường đại học, cao đẳng kỹ thuật trên toàn quốc.';
      }
    } else if (primary === 'S') {
      if (math >= 7.0 && eng >= 7.5) {
        primaryCombo = 'D01';
        backupCombo = 'B00';
        rationale = 'Nhóm Xã hội kết hợp tư duy ngôn ngữ tốt phù hợp cho ngành Tâm lý học, Giáo dục, Luật hoặc Quản lý dịch vụ Y tế.';
      } else {
        primaryCombo = 'B00';
        backupCombo = 'D07';
        rationale = 'Tổ hợp then chốt cho khối ngành Chăm sóc sức khỏe, Y sinh và Dược học.';
      }
    } else if (primary === 'A') {
      primaryCombo = 'D01';
      backupCombo = 'H01';
      rationale = 'Nền tảng Toán - Văn - Anh vững chắc giúp mở rộng xét tuyển khối ngành Thiết kế đa phương tiện, UI/UX, Truyền thông số.';
    } else {
      primaryCombo = 'D01';
      backupCombo = 'A01';
      rationale = 'Lựa chọn an toàn, độ phủ tuyển sinh rộng nhất vào các trường khối ngành Kinh tế, Quản trị, Marketing và Logistics.';
    }

    return {
      primaryCombo,
      backupCombo,
      rationale,
      timeline: [
        { year: "Lớp 10", focus: "Thăm dò & Nền tảng", desc: `Học đều các môn, chú trọng củng cố 3 môn tổ hợp ${primaryCombo}. Tham gia 1-2 trải nghiệm thử (Career Experiments) để kiểm chứng sở thích.` },
        { year: "Lớp 11", focus: "Kỹ năng & Chứng chỉ", desc: "Đạt mục tiêu chứng chỉ ngoại ngữ (IELTS/VSTEP) nếu có định hướng xét tuyển kết hợp; bắt đầu tiếp cận cấu trúc đề thi Đánh giá năng lực / Đánh giá tư duy." },
        { year: "Lớp 12", focus: "Chiến lược & Đột phá", desc: "Tập trung tối đa cho Kỳ thi tốt nghiệp THPT và các đợt thi ĐGNL (HSA/APT/TSA) sớm để chủ động đỗ nguyện vọng ưu tiên." }
      ]
    };
  }

  /**
   * Bộ giải quyết hành động tiếp theo tất định (Deterministic 8-State Next Action Resolver - Section 5)
   * Tuyệt đối không bịa đặt bằng chứng; chỉ hiển thị dữ liệu thực tế từ trạng thái người dùng.
   * @param {object} params
   */
  resolveNextActionState(params = {}) {
    const {
      profile = null,
      riasecScores = null,
      socratic = null,
      hypotheses = [],
      experimentsState = {},
      isFastTrack = false
    } = params;

    // Helper: Định dạng mã RIASEC
    const topRiasecCodes = riasecScores ? this.getTopRiasecCodes(riasecScores).slice(0, 3).join('-') : '';

    // 1. STATE 1: Profile incomplete
    const hasValidName = profile && profile.name && profile.name.trim() !== '' && profile.name.trim() !== 'Học sinh';
    const hasValidGrade = profile && profile.grade && profile.grade.trim() !== '';
    const hasValues = profile && Array.isArray(profile.coreValues) && profile.coreValues.length > 0;
    const hasWorkPrefs = profile && Array.isArray(profile.workPreferences) && profile.workPreferences.length > 0;
    const hasAcademic = profile && (profile.math !== null && profile.math !== undefined && !isNaN(profile.math));
    
    const isProfileComplete = isFastTrack
      ? Boolean(hasValidName && hasValidGrade)
      : Boolean(hasValidName && hasValidGrade && (hasValues || hasWorkPrefs || hasAcademic));

    if (!profile || !isProfileComplete) {
      const availableEvidence = [];
      if (profile && profile.name && profile.name.trim() !== 'Học sinh') availableEvidence.push(`Họ và tên: ${profile.name}`);
      if (profile && profile.grade) availableEvidence.push(`Khối lớp: ${profile.grade}`);

      return {
        stateIndex: 1,
        stage: 'Hồ sơ học tập & định hướng cá nhân chưa hoàn thiện',
        availableEvidence,
        missingEvidence: [
          'Thông tin nền tảng về học lực, giá trị cốt lõi và môi trường làm việc mong muốn'
        ],
        nextAction: 'Hoàn thiện thông tin hồ sơ học tập và định hướng cá nhân cơ bản.',
        ctaText: 'Tiếp tục hồ sơ',
        ctaActionType: 'GO_SCREEN_1',
        targetId: null,
        targetName: null
      };
    }

    // 2. STATE 2: RIASEC incomplete (< 12 questions answered or scores empty)
    const hasRiasec = riasecScores && typeof riasecScores === 'object' && Object.values(riasecScores).some(v => typeof v === 'number' && v > 0);
    if (!hasRiasec) {
      const availableEvidence = [
        `Hồ sơ học sinh: ${profile.name} (${profile.grade})`
      ];
      if (hasValues) availableEvidence.push(`Giá trị ưu tiên: ${profile.coreValues.join(', ')}`);
      if (hasWorkPrefs) availableEvidence.push(`Phong cách làm việc: ${profile.workPreferences.join(', ')}`);

      return {
        stateIndex: 2,
        stage: 'Chưa hoàn thành khảo sát sở thích RIASEC',
        availableEvidence,
        missingEvidence: [
          'Điểm thiên hướng sở thích 6 nhóm RIASEC (R-I-A-S-E-C)'
        ],
        nextAction: 'Thực hiện bài sàng lọc sở thích nghề nghiệp RIASEC để nhận diện thiên hướng tự nhiên.',
        ctaText: 'Bắt đầu RIASEC',
        ctaActionType: isFastTrack ? 'GO_SCREEN_1' : 'GO_SCREEN_2',
        targetId: null,
        targetName: null
      };
    }

    // 3. STATE 3: Socratic / exploration step incomplete
    const hasSocratic = isFastTrack || Boolean(
      socratic && (
        socratic.completed === true ||
        (socratic.q1 && socratic.q1.trim().length > 0) ||
        (socratic.q2 && socratic.q2.trim().length > 0) ||
        (socratic.q3 && socratic.q3.trim().length > 0)
      )
    );

    if (!hasSocratic) {
      return {
        stateIndex: 3,
        stage: 'Hoàn thiện bước khảo sát sâu Socratic',
        availableEvidence: [
          `Điểm sở thích RIASEC: ${topRiasecCodes}`,
          `Hồ sơ học sinh: ${profile.name} (${profile.grade})`
        ],
        missingEvidence: [
          'Góc nhìn tự nhận thức cá nhân và mong đợi gia đình qua 3 câu hỏi Socratic gợi mở'
        ],
        nextAction: 'Trả lời 3 câu hỏi Socratic để làm rõ mong muốn cá nhân và bối cảnh gia đình.',
        ctaText: 'Tiếp tục khám phá',
        ctaActionType: 'GO_SCREEN_3',
        targetId: null,
        targetName: null
      };
    }

    // 4. STATE 4: No Career Hypothesis yet
    if (!hypotheses || !Array.isArray(hypotheses) || hypotheses.length === 0) {
      return {
        stateIndex: 4,
        stage: 'Xây dựng các giả thiết nghề nghiệp đầu tiên',
        availableEvidence: [
          `Hồ sơ học tập & điểm sở thích RIASEC (${topRiasecCodes}) đã hoàn thành`
        ],
        missingEvidence: [
          'Danh sách các giả thiết nghề nghiệp cụ thể để bắt đầu kiểm chứng'
        ],
        nextAction: 'Tổng hợp bằng chứng để khởi tạo các giả thiết nghề nghiệp phù hợp với em.',
        ctaText: 'Xem các hướng phù hợp để khám phá',
        ctaActionType: 'GENERATE_HYPOTHESES',
        targetId: null,
        targetName: null
      };
    }

    // Lấy thông tin kho thử nghiệm nếu có
    const expRepo = (typeof window !== 'undefined' && window.EXPERIMENT_REPOSITORY) ||
                    (typeof global !== 'undefined' && global.EXPERIMENT_REPOSITORY) || {};

    const expValues = Object.values(experimentsState || {});

    // 5. STATE 7: Experiment completed but reflection missing (PRIORITIZED BEFORE NEW EXPERIMENT)
    const refExp = expValues.find(e => e.status === 'REFLECTION' || (e.status === 'COMPLETED' && (!e.reflection || Object.keys(e.reflection).length === 0)));
    if (refExp) {
      const expDef = expRepo[refExp.id] || refExp;
      const expTitle = expDef.title || refExp.id;
      return {
        stateIndex: 7,
        stage: 'Phản tư về trải nghiệm vừa hoàn thành',
        availableEvidence: [
          `Đã hoàn thành các bước thực hành của thử nghiệm: "${expTitle}"`
        ],
        missingEvidence: [
          '6 câu hỏi phản tư đúc kết cảm xúc, mức độ yêu thích và độ vừa sức thực tế'
        ],
        nextAction: 'Hoàn thành 6 câu hỏi phản tư để chuyển hóa trải nghiệm thành bằng chứng hướng nghiệp.',
        ctaText: 'Bắt đầu phản tư',
        ctaActionType: 'OPEN_REFLECTION',
        targetId: refExp.id,
        targetName: expTitle
      };
    }

    // 6. STATE 6: Experiment active but unfinished (IN PROGRESS)
    const activeExp = expValues.find(e => e.status === 'IN PROGRESS');
    if (activeExp) {
      const expDef = expRepo[activeExp.id] || activeExp;
      const expTitle = expDef.title || activeExp.id;
      const careerName = expDef.careerName || expDef.relatedCareerHypothesis || null;

      const availableEvidence = [`Đang làm thử nghiệm thực tế: "${expTitle}"`];
      if (careerName) availableEvidence.push(`Hướng nghề liên quan: ${careerName}`);

      return {
        stateIndex: 6,
        stage: `Đang thực hiện thử nghiệm: ${expTitle}`,
        availableEvidence,
        missingEvidence: [
          'Chưa hoàn thành 4 bước thực hành và chưa ghi nhận phản tư cá nhân'
        ],
        nextAction: 'Tiếp tục hoàn thành thử nghiệm và chuẩn bị đúc kết cảm nhận.',
        ctaText: 'Tiếp tục thử nghiệm',
        ctaActionType: 'RESUME_EXPERIMENT',
        targetId: activeExp.id,
        targetName: expTitle
      };
    }

    // 7. STATE 8: Experiment + reflection complete (COMPLETED with reflection)
    const completedExps = expValues.filter(e => e.status === 'COMPLETED' && e.reflection && Object.keys(e.reflection).length > 0);
    if (completedExps.length > 0) {
      const lastExp = completedExps[completedExps.length - 1];
      const expDef = expRepo[lastExp.id] || lastExp;
      const completedTitle = expDef.title || lastExp.id;

      // Tìm giả thiết tiếp theo chưa có thử nghiệm
      const nextHypo = hypotheses.find(h => {
        const hExpId = h.experiment ? h.experiment.id : (h.experiments && h.experiments[0] ? h.experiments[0].id : null);
        return !hExpId || !experimentsState[hExpId] || experimentsState[hExpId].status === 'NOT STARTED';
      });

      const nextAction = nextHypo
        ? `Khám phá thử nghiệm thực tế tiếp theo cho hướng "${nextHypo.name}" hoặc đối chiếu góc nhìn gia đình.`
        : `So sánh các giả thiết nghề nghiệp và đối chiếu lộ trình học tập THPT / Đại học.`;

      const ctaText = nextHypo ? 'Khám phá thử nghiệm tiếp theo' : 'So sánh các giả thiết';
      const ctaActionType = nextHypo ? 'NEXT_EXPERIMENT' : 'COMPARE_HYPOTHESES';
      const targetExpId = nextHypo && nextHypo.experiment ? nextHypo.experiment.id : null;

      return {
        stateIndex: 8,
        stage: 'Đã hoàn thành thử nghiệm & phản tư thực tế',
        availableEvidence: [
          `Đã có bằng chứng thực tế từ thử nghiệm: "${completedTitle}"`,
          'Đã ghi nhận phản tư cá nhân về mức độ phù hợp thực tế'
        ],
        missingEvidence: [
          'Đối chiếu đa chiều với các giả thiết nghề nghiệp khác hoặc chọn thử nghiệm mở rộng'
        ],
        nextAction,
        ctaText,
        ctaActionType,
        targetId: targetExpId,
        targetName: nextHypo ? nextHypo.name : null
      };
    }

    // 8. STATE 5: Hypothesis exists but no Career Experiment completed/started
    const topHypothesis = hypotheses[0];
    const expObj = topHypothesis.experiment || (topHypothesis.experiments && topHypothesis.experiments[0]) || {
      id: 'exp_ai_chatbot',
      title: 'Xây dựng Trợ lý ảo Mini',
      duration: '90 phút'
    };

    const expTitle = expObj.title || 'Dự án thực tế ngắn hạn';
    const expDuration = expObj.duration || '60–90 phút';
    const expId = expObj.id || 'exp_ai_chatbot';

    // Xây dựng bằng chứng hiện có strictly từ state (không bịa đặt)
    const availableEvidence = [];
    if (topRiasecCodes) availableEvidence.push(`RIASEC: ${topRiasecCodes}`);
    if (profile.math !== null && profile.math !== undefined && !isNaN(profile.math)) {
      if (profile.math >= 8.0) availableEvidence.push(`Toán là tín hiệu học tập nổi bật (${profile.math}/10)`);
      else availableEvidence.push(`Điểm Toán: ${profile.math}/10`);
    }
    if (profile.lit !== null && profile.lit !== undefined && !isNaN(profile.lit)) {
      if (profile.lit >= 8.0) availableEvidence.push(`Ngữ văn là tín hiệu học tập nổi bật (${profile.lit}/10)`);
      else availableEvidence.push(`Điểm Ngữ văn: ${profile.lit}/10`);
    }
    if (profile.eng !== null && profile.eng !== undefined && !isNaN(profile.eng)) {
      if (profile.eng >= 8.0) availableEvidence.push(`Tiếng Anh là tín hiệu học tập nổi bật (${profile.eng}/10)`);
      else availableEvidence.push(`Điểm Tiếng Anh: ${profile.eng}/10`);
    }
    if (hasValues) availableEvidence.push(`Ưu tiên giá trị: ${profile.coreValues.slice(0, 2).join(' & ')}`);
    if (hasWorkPrefs) availableEvidence.push(`Phong cách làm việc: ${profile.workPreferences.slice(0, 2).join(', ')}`);

    return {
      stateIndex: 5,
      stage: `Em đang khám phá: ${topHypothesis.name}`,
      availableEvidence,
      missingEvidence: [
        'Chưa có trải nghiệm thực tế với công việc này'
      ],
      nextAction: `Thử mini-project "${expTitle}" (${expDuration}) để kiểm chứng cảm xúc thật khi thao tác.`,
      ctaText: 'Bắt đầu thử nghiệm',
      ctaActionType: 'START_EXPERIMENT',
      targetId: expId,
      targetName: topHypothesis.name
    };
  }
}

if (typeof window !== 'undefined') {
  window.OrionCareerEngine = OrionCareerEngine;
  window.orionCareerEngine = new OrionCareerEngine();
}
if (typeof global !== 'undefined') {
  global.OrionCareerEngine = OrionCareerEngine;
  global.orionCareerEngine = new OrionCareerEngine();
}
